import { Link } from "react-router-dom";

import Navbar from "@/components/custom/Navbar";

const PageNotFound = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center border rounded-2xl p-10 max-w-xl w-full shadow-sm">
          <h1 className="text-7xl font-bold mb-4">
            404
          </h1>

          <h2 className="text-2xl font-semibold mb-4">
            Page Not Found
          </h2>

          <p className="text-gray-600 mb-8">
            The page you are looking for does not exist or has been moved.
          </p>

          <Link
            to="/"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;