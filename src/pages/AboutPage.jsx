import { useNavigate } from "react-router-dom";

import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";

const categories = [
  {
    title: "men's clothing",
    image:
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "women's clothing",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=687&auto=format&fit=crop",
  },
  {
    title: "jewelery",
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=687&auto=format&fit=crop",
  },
  {
    title: "electronics",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=870&auto=format&fit=crop",
  },
];

const AboutPage = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/productlist?category=${encodeURIComponent(category)}`);
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-14">

        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            About Us
          </h1>

          <div className="w-24 h-[2px] bg-black mx-auto mt-5 rounded-full" />
        </div>

        {/* Description */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-10 max-w-4xl mx-auto text-center shadow-sm">
          <p className="text-gray-600 leading-8 text-sm sm:text-base">
            Welcome to Zentixor — your destination for fashion,
            jewelry, and premium electronics. We focus on bringing
            together modern style, quality products, and a smooth
            shopping experience all in one place.
          </p>
        </div>

        {/* Categories */}
        <section className="mt-20">

          <h2 className="text-3xl font-bold text-center mb-12 tracking-tight">
            Our Categories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

            {categories.map((item, index) => (
              <div
                key={index}
                onClick={() => handleCategoryClick(item.title)}
                className="group rounded-2xl overflow-hidden bg-white border border-gray-200 hover:shadow-xl transition duration-300 cursor-pointer"
              >

                {/* Image */}
                <div className="h-64 overflow-hidden">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Title */}
                <div className="p-4">

                  <h3 className="text-base font-medium text-center text-gray-800 capitalize group-hover:text-black transition">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AboutPage;