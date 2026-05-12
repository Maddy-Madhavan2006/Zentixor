import Navbar from "@/components/custom/Navbar";
import Main from "@/components/custom/main";
import Footer from "@/components/custom/Footer";
import Products from "@/components/custom/Products";

const Home = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">

        {/* Hero Section */}
        <section>
          <Main />
        </section>

        {/* Products Section */}
        <section className="py-10 sm:py-16 bg-gray-50">
          <Products />
        </section>

      </main>

      <Footer />
    </>
  );
};

export default Home;