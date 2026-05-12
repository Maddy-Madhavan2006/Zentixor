import React from "react";
import { useNavigate } from "react-router-dom";
import mainImg from "@/assets/herobg.png";
import {
  Shirt,
  Gem,
  Monitor,
  ArrowRight,
} from "lucide-react";

const Main = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-[560px] sm:h-[620px] overflow-hidden">

      {/* Background Image */}
      <img
        src={mainImg}
        alt="Hero Banner"
        className="w-full h-full object-cover object-center"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6">

        <div className="text-center text-white max-w-4xl">

          {/* Top Label */}
          <div className="flex items-center justify-center gap-4 mb-5">

            <div className="w-12 sm:w-20 h-[1px] bg-white/30" />

            <p className="tracking-[4px] text-[10px] sm:text-xs uppercase text-white/70">
              New Season Arrivals
            </p>

            <div className="w-12 sm:w-20 h-[1px] bg-white/30" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            STYLE. SHINE. TECH.
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-2xl sm:text-3xl italic font-light text-[#d4b483]">
            All in One Place
          </p>

          {/* Categories */}
          <div className="mt-10 flex flex-wrap justify-center items-center gap-6 sm:gap-10">

            {/* Clothing */}
            <div className="flex flex-col items-center">
              <Shirt size={30} strokeWidth={1.5} />
              <p className="mt-2 tracking-[2px] text-[11px] sm:text-sm">
                CLOTHING
              </p>
            </div>

            <div className="hidden sm:block h-10 w-[1px] bg-white/20" />

            {/* Jewelry */}
            <div className="flex flex-col items-center">
              <Gem size={30} strokeWidth={1.5} />
              <p className="mt-2 tracking-[2px] text-[11px] sm:text-sm">
                JEWELRY
              </p>
            </div>

            <div className="hidden sm:block h-10 w-[1px] bg-white/20" />

            {/* Electronics */}
            <div className="flex flex-col items-center">
              <Monitor size={30} strokeWidth={1.5} />
              <p className="mt-2 tracking-[2px] text-[11px] sm:text-sm">
                ELECTRONICS
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="mt-10">

            <button
              onClick={() => navigate("/productlist")}
              className="group border border-[#d4b483] text-[#f5e7cf] px-7 py-3 text-sm tracking-[3px] uppercase hover:bg-[#d4b483] hover:text-black transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                Shop Now

                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition"
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;