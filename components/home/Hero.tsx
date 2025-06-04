"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    image:
      "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Elevate Your Style",
    description: "Discover our new collection of premium fashion essentials",
    cta: "Shop Collection",
    link: "/products/fashion",
    position: "left",
  },
  {
    id: 2,
    image:
      "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Home & Living",
    description: "Transform your space with our curated home decor selection",
    cta: "Explore Home",
    link: "/products/home",
    position: "right",
  },
  {
    id: 3,
    image:
      "https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Tech Essentials",
    description: "The latest gadgets and accessories for the modern lifestyle",
    cta: "Shop Tech",
    link: "/products/tech",
    position: "left",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        setIsAnimating(false);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            current === index ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          <div className="absolute inset-0 bg-black/30 z-10" />
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
          <div
            className={cn(
              "absolute z-20 max-w-xl p-6 md:p-12 text-white",
              "top-1/2 transform -translate-y-1/2 transition-all duration-700",
              slide.position === "left"
                ? "left-8 md:left-24"
                : "right-8 md:right-24 text-right",
              isAnimating && current === index && "opacity-0 translate-y-12"
            )}
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {slide.title}
            </h1>
            <p className="text-lg mb-8 text-white/90">{slide.description}</p>
            <Button asChild size="lg" className="group">
              <Link href={slide.link}>
                {slide.cta}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      ))}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              current === index ? "bg-white w-8" : "bg-white/50"
            )}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
