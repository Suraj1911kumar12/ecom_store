"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/products/ProductCard";
import { featuredProducts } from "@/data/products";

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState("trending");
  const { addToCart } = useCart();
  
  const categories = [
    { id: "trending", label: "Trending Now" },
    { id: "bestsellers", label: "Bestsellers" },
    { id: "new", label: "New Arrivals" },
  ];

  return (
    <section className="py-16 px-4 container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
        <div className="flex space-x-1 mt-4 md:mt-0 bg-secondary/50 p-1 rounded-lg">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-md transition-all",
                activeTab === category.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {featuredProducts
          .filter(product => product.category === activeTab)
          .slice(0, 8)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>

      <div className="flex justify-center mt-12">
        <Button asChild>
          <Link href="/products">
            View All Products
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default FeaturedProducts;