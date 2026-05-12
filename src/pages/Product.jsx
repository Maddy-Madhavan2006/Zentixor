import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";
import { addToCart } from "@/lib/utils";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProductData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);

        const similarRes = await fetch(
          `https://fakestoreapi.com/products/category/${data.category}`
        );
        const similarData = await similarRes.json();
        setSimilarProducts(similarData.filter((p) => p.id !== data.id));
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    };
    getProductData();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-16 animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            <div className="h-[450px] bg-gray-200 rounded-2xl" />

            <div className="space-y-4">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-8 w-full bg-gray-200 rounded" />
              <div className="h-6 w-40 bg-gray-200 rounded" />
              <div className="h-6 w-32 bg-gray-200 rounded" />
              <div className="h-24 w-full bg-gray-200 rounded" />
            </div>

          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) return <div className="text-center py-20">Product Not Found</div>;

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-12">

        {/* PRODUCT SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

          {/* IMAGE */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 flex items-center justify-center hover:shadow-lg transition">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[450px] object-contain hover:scale-105 transition duration-300"
            />
          </div>

          {/* DETAILS */}
          <div>

            <p className="uppercase text-xs tracking-widest text-gray-400 mb-3">
              {product.category}
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 mb-5">
              <span className="text-yellow-500 text-lg">★</span>
              <span className="font-medium text-gray-700">
                {product.rating?.rate}
              </span>
            </div>

            <h2 className="text-3xl font-bold mb-6">
              ${product.price}
            </h2>

            <p className="text-gray-600 leading-7 mb-8">
              {product.description}
            </p>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-4">

              <button
                onClick={() => addToCart(product)}
                className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition"
              >
                Add to Cart
              </button>

              <Link
                to="/cart"
                className="border border-gray-300 px-6 py-3 rounded-full hover:bg-black hover:text-white transition"
              >
                Go to Cart
              </Link>

            </div>

          </div>
        </div>

        {/* SIMILAR PRODUCTS */}
        <section className="mt-20">

          <h2 className="text-2xl sm:text-3xl font-bold mb-10">
            You May Also Like
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {similarProducts.map((item) => (
              <div
                key={item.id}
                className="group border border-gray-200 rounded-2xl p-4 bg-white hover:shadow-xl transition"
              >

                <div className="h-40 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full object-contain group-hover:scale-105 transition"
                  />
                </div>

                <h3 className="text-sm font-medium mt-3 line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-black font-bold mt-2">
                  ${item.price}
                </p>

                <div className="flex gap-2 mt-4">

                  <Link
                    to={`/product/${item.id}`}
                    className="flex-1 text-center text-sm bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => addToCart(item)}
                    className="flex-1 text-sm border border-gray-300 py-2 rounded-lg hover:bg-black hover:text-white transition"
                  >
                    Add
                  </button>

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

export default Product;