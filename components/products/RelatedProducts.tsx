"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { featuredProducts } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import { cn } from "@/lib/utils";

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
}

const RelatedProducts = ({ currentProductId, category }: RelatedProductsProps) => {
  const relatedProducts = featuredProducts
    .filter(
      (product) =>
        product.id !== currentProductId &&
        (product.category === category || Math.random() > 0.5) // Include some random products for demo
    )
    .slice(0, 8);

  const [scrollPosition, setScrollPosition] = useState(0);
  const maxScroll = relatedProducts.length > 4 ? 1 : 0;

  const handleScroll = (direction: 'left' | 'right') => {
    if (direction === 'left' && scrollPosition > 0) {
      setScrollPosition(scrollPosition - 1);
    } else if (direction === 'right' && scrollPosition < maxScroll) {
      setScrollPosition(scrollPosition + 1);
    }
  };

  if (relatedProducts.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">You May Also Like</h2>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleScroll('left')}
            disabled={scrollPosition === 0}
            className="h-8 w-8 rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous products</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleScroll('right')}
            disabled={scrollPosition === maxScroll}
            className="h-8 w-8 rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next products</span>
          </Button>
        </div>
      </div>
      
      <div className="relative overflow-hidden">
        <div 
          className="flex gap-6 transition-transform duration-500 ease-in-out" 
          style={{ transform: `translateX(-${scrollPosition * 25}%)` }}
        >
          {relatedProducts.map((product) => (
            <div key={product.id} className="min-w-[calc(100%-24px)] sm:min-w-[calc(50%-24px)] lg:min-w-[calc(33.333%-24px)] xl:min-w-[calc(25%-24px)] max-w-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;