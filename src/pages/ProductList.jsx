import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";
import ProductListComponent from "@/components/custom/Products";

const ProductList = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">

        {/* Page Header */}
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            All Products
          </h1>

          <div className="w-20 h-[2px] bg-black mx-auto mt-4 rounded-full" />

          <p className="text-gray-500 mt-4 text-sm sm:text-base max-w-2xl mx-auto">
            Browse our complete collection of products carefully curated for quality and style.
          </p>

        </div>

        {/* Products Section */}
        <section className="bg-gray-50 py-10 sm:py-14">
          <ProductListComponent />
        </section>

      </main>

      <Footer />
    </>
  );
};

export default ProductList;