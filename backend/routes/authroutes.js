const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');
const { Resend } = require('resend');

const saltRounds = 10;

// RESEND SETUP
const resend = new Resend(process.env.RESEND_API_KEY);



// ======================================================
// REGISTER ROUTE
// ======================================================
router.post('/register', async (req, res) => {

    const { username, email, password } = req.body;

    // VALIDATION
    if (!username || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // CHECK USER EXISTS
    const checkUser = "SELECT * FROM users WHERE email = ?";

    db.query(checkUser, [email], async (err, result) => {

        if (err) {
            console.error("DB Error:", err);

            return res.status(500).json({
                message: "Database error during registration check"
            });
        }

        // EMAIL EXISTS
        if (result.length > 0) {
            return res.status(400).json({
                message: "This email is already registered"
            });
        }

        try {

            // HASH PASSWORD
            const hashedPassword = await bcrypt.hash(
                password,
                saltRounds
            );

            // INSERT USER
            const sql = `
                INSERT INTO users (username, email, password)
                VALUES (?, ?, ?)
            `;

            db.query(
                sql,
                [username, email, hashedPassword],
                (err, data) => {

                    if (err) {
                        console.error("Insert Error:", err);

                        if (err.code === 'ER_DUP_ENTRY') {
                            return res.status(400).json({
                                message: "Email already exists"
                            });
                        }

                        return res.status(500).json({
                            message: "Failed to create account"
                        });
                    }

                    return res.status(201).json({
                        status: "Success",
                        message: "User created successfully!"
                    });
                }
            );

        } catch (hashError) {

            console.error("Hashing Error:", hashError);

            return res.status(500).json({
                message: "Error securing password"
            });
        }
    });
});



// ======================================================
// LOGIN ROUTE
// ======================================================
router.post('/login', (req, res) => {

    const { email, password } = req.body;

    // VALIDATION
    if (!email || !password) {
        return res.status(400).json({
            message: "Please provide both email and password"
        });
    }

    // FIND USER
    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], async (err, data) => {

        if (err) {

            console.error("Login DB Error:", err);

            return res.status(500).json({
                message: "Server database connection error"
            });
        }

        // USER NOT FOUND
        if (data.length === 0) {
            return res.status(401).json({
                status: "Fail",
                message: "Invalid email or password"
            });
        }

        const user = data[0];

        try {

            // CHECK PASSWORD
            const passwordMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (passwordMatch) {

                return res.status(200).json({
                    status: "Success",
                    message: "Login successful",
                    user: {
                        id: user.id,
                        username: user.username,
                        email: user.email
                    }
                });

            } else {

                return res.status(401).json({
                    status: "Fail",
                    message: "Invalid email or password"
                });

            }

        } catch (compareError) {

            console.error(
                "Password Compare Error:",
                compareError
            );

            return res.status(500).json({
                message: "Authentication error"
            });
        }
    });
});



// ======================================================
// CONTACT ROUTE
// ======================================================
router.post('/contact', async (req, res) => {

    const { name, email, message } = req.body;

    // VALIDATION
    if (!name || !email || !message) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // SAVE TO DATABASE
    const sql = `
        INSERT INTO contacts (name, email, message)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [name, email, message], async (err, result) => {

        if (err) {

            console.error("Contact DB Error:", err);

            return res.status(500).json({
                message: "Failed to save contact message"
            });
        }

        try {

            // SEND EMAIL USING RESEND
            await resend.emails.send({
                from: process.env.RESEND_FROM_EMAIL,
                to: process.env.MY_EMAIL,
                subject: `New Contact Form Message from ${name}`,

                html: `
                    <div style="font-family: Arial; padding: 20px;">
                        <h2>New Contact Message</h2>

                        <p>
                            <strong>Name:</strong> ${name}
                        </p>

                        <p>
                            <strong>Email:</strong> ${email}
                        </p>

                        <p>
                            <strong>Message:</strong>
                        </p>

                        <div style="padding: 12px; background: #f4f4f4; border-radius: 8px;">
                            ${message}
                        </div>
                    </div>
                `
            });

            return res.status(201).json({
                status: "Success",
                message: "Message sent successfully!"
            });

        } catch (emailError) {

            console.error("Resend Error:", emailError);

            return res.status(500).json({
                message: "Saved in DB but failed to send email"
            });
        }
    });
});

module.exports = router;