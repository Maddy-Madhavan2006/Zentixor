import React from "react";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          
          {/* Brand */}
          <h2 className="text-lg font-semibold tracking-wide text-gray-900">
            Zentixor
          </h2>

          {/* Divider line (subtle accent) */}
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Zentixor. All Rights Reserved.
          </p>

          {/* Optional subtle tagline */}
          <p className="text-xs text-gray-400">
            Built with care for a smooth shopping experience
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;