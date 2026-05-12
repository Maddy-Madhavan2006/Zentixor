import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { addToCart } from "@/lib/utils";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category");

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();

        setProducts(data);

        if (selectedCategory) {
          setFilteredProducts(
            data.filter(
              (item) => item.category === selectedCategory
            )
          );
        } else {
          setFilteredProducts(data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [selectedCategory]);

  const filterProducts = (category) => {
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((item) => item.category === category)
      );
    }
  };

  const categories = [
    "all",
    "men's clothing",
    "women's clothing",
    "jewelery",
    "electronics",
  ];

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="rounded-2xl border p-4">
            <Skeleton height={280} />
            <div className="mt-4">
              <Skeleton count={2} />
            </div>
          </div>
        ))}
    </div>
  );

  const ShowProducts = () => (
    <>
      {/* CATEGORY BUTTONS */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => filterProducts(cat)}
            className="px-4 py-2 text-sm rounded-full border border-gray-300 text-gray-600 hover:bg-black hover:text-white transition capitalize"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group relative bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition duration-300"
          >
            {/* IMAGE */}
            <div className="h-[300px] flex items-center justify-center bg-white p-6">
              <img
                src={product.image}
                alt={product.title}
                className="h-full object-contain group-hover:scale-105 transition duration-300"
              />
            </div>

            {/* CONTENT */}
            <div className="p-5 border-t border-gray-100">
              <h3 className="text-sm font-medium line-clamp-1 text-gray-900">
                {product.title}
              </h3>

              <div className="flex items-center justify-between mt-3">
                <span className="text-xl font-bold text-black">
                  ${product.price}
                </span>

                <span className="text-sm text-yellow-500 font-medium">
                  ★ {product.rating?.rate}
                </span>
              </div>
            </div>

            {/* HOVER + MOBILE ACTIONS */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition">
              <div
                className="
                  absolute bottom-0 left-0 right-0 p-4 flex gap-3
                  opacity-100 translate-y-0
                  sm:opacity-0 sm:translate-y-6
                  sm:group-hover:opacity-100 sm:group-hover:translate-y-0
                  transition duration-300
                "
              >
                <Link
                  to={`/product/${product.id}`}
                  className="flex-1 text-center py-2 rounded-lg bg-black text-white text-sm hover:bg-gray-800 transition"
                >
                  View
                </Link>

                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 py-2 rounded-lg bg-white border border-gray-300 text-sm hover:bg-black hover:text-white hover:border-black transition"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      {/* TITLE */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Latest Products
        </h2>
        <div className="w-20 h-[2px] bg-black mx-auto mt-4 rounded-full" />
      </div>

      {loading ? <LoadingSkeleton /> : <ShowProducts />}
    </section>
  );
};

export default Products;