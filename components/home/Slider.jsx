"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Slider = () => {
  const slides = [
    {
      url: "https://eng.univ-setif.dz/images/Banni%C3%A8re.jpg",
      title: "Welcome to Our University",
      text: "Explore our diverse programs and vibrant campus life",
      cta: "Discover Programs",
      ctaLink: "/programs",
    },
    {
      url: "https://ancien-eng.univ-setif.dz/assets/ufas-5945f6222070cb63c96ea4bf865576be985301069a10f2736cc027068e727627.jpg",
      title: "Academic Excellence",
      text: "Join a community of scholars and pursue your academic passions",
      cta: "Meet Our Faculty",
      ctaLink: "/faculty",
    },
    {
      url: "https://iceeac23.univ-setif.dz/images/base/slide/212076-campus-el-bez.jpg",
      title: "Innovative Research",
      text: "Engage in groundbreaking research and make a difference",
      cta: "Research Opportunities",
      ctaLink: "/research",
    },
  ];

  return (
    <div className="relative h-[500px] md:h-[700px] w-full bg-black">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 3,
        }}
        loop={true}
        speed={1200}
        preloadimages="true"
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full bg-black">
              <Image
                src={slide.url}
                alt={slide.title}
                fill
                className="object-cover object-center"
                priority={index < 2}
                sizes="100vw"
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <div className="max-w-4xl mx-auto space-y-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`slide-${index}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
                      >
                        {slide.title}
                      </motion.h1>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.6,
                          delay: 0.2,
                          ease: "easeOut",
                        }}
                        className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-6"
                      >
                        {slide.text}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <Button
                          size="lg"
                          className="px-8 py-6 text-lg font-medium"
                          variant="secondary"
                        >
                          {slide.cta}
                        </Button>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="swiper-button-prev group">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all">
            <ChevronLeft className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="swiper-button-next group">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all">
            <ChevronRight className="w-6 h-6 text-white" />
          </div>
        </div>
      </Swiper>

      <div className="absolute bottom-0 left-0 right-0 h-1 z-10">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
          key={slides.length}
        />
      </div>

      <style jsx global>{`
        .swiper {
          --swiper-navigation-size: 24px;
          --swiper-pagination-bullet-size: 10px;
          --swiper-pagination-bullet-horizontal-gap: 6px;
        }

        .swiper-wrapper {
          transition-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
        }

        .swiper-pagination-bullet {
          background: white;
          opacity: 0.6;
          width: var(--swiper-pagination-bullet-size);
          height: var(--swiper-pagination-bullet-size);
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          background: hsl(var(--primary));
          opacity: 1;
          width: 24px;
          border-radius: 4px;
        }

        .swiper-button-prev,
        .swiper-button-next {
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .swiper:hover .swiper-button-prev,
        .swiper:hover .swiper-button-next {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Slider;
