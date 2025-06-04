"use client";

import { Heart, ShoppingCart, X, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useWishlist } from "@/context/WishlistContext";

const WishlistPage = () => {
  const wishlist = useWishlist();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState(wishlist?.wishlistItems);

  // console.log("wishlist", wishlist?.wishlistItems);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const removeFromWishlist = (id: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const calculateSavings = (price: number, discountedPrice: number) => {
    return (price - discountedPrice).toFixed(2);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground">Wishlist</span>
      </div>

      {/* Header */}
      <div className="flex flex-col items-start mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-2"
        >
          Your Wishlist
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-muted-foreground"
        >
          {wishlistItems.length}{" "}
          {wishlistItems.length === 1 ? "luxury item" : "luxury items"} saved
        </motion.p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <Skeleton className="h-80 w-full" />
              <div className="p-5 space-y-4">
                <Skeleton className="h-5 w-3/4" />
                <div className="flex gap-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex justify-between pt-4">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : wishlistItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center py-20 border rounded-lg"
        >
          <Heart
            className="h-16 w-16 text-muted-foreground mb-4"
            strokeWidth={1}
          />
          <h2 className="text-2xl font-semibold mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md text-center">
            Save luxury items you love by clicking the heart icon. They'll
            appear here for your consideration.
          </p>
          <Button asChild className="px-8 py-4">
            <Link href="/products">Discover Luxury Items</Link>
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {wishlistItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "border rounded-lg overflow-hidden group relative",
                  "hover:shadow-lg transition-shadow duration-300",
                  theme === "dark" ? "bg-card" : "bg-white"
                )}
              >
                {/* Badges */}
                <div className="absolute top-3 left-3 z-10 space-y-2">
                  {item.isNew && (
                    <Badge
                      variant="secondary"
                      className="bg-green-600 text-white"
                    >
                      New Arrival
                    </Badge>
                  )}
                  {item.discount > 0 && (
                    <Badge
                      variant="secondary"
                      className="bg-rose-600 text-white"
                    >
                      Save {item.discount}%
                    </Badge>
                  )}
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className={cn(
                    "absolute top-3 right-3 z-10 p-2 rounded-full transition-all",
                    "bg-white/80 backdrop-blur-sm hover:bg-white",
                    "dark:bg-gray-800/80 dark:hover:bg-gray-700",
                    "focus:outline-none focus:ring-2 focus:ring-primary"
                  )}
                >
                  <X className="h-5 w-5 text-foreground" />
                </button>

                {/* Product Image */}
                <Link href={`/products/${item.id}`} className="block">
                  <div className="relative h-80 w-full overflow-hidden">
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-1">
                    <Link href={`/products/${item.id}`}>
                      <h3 className="font-medium text-lg hover:text-primary transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                    </Link>
                  </div>

                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm">{item.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({item.reviewCount} reviews)
                    </span>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Price */}
                  <div className="mb-4">
                    {item.discount > 0 ? (
                      <>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-bold">
                            ${item.discountedPrice.toFixed(2)}
                          </span>
                          <span className="text-sm text-muted-foreground line-through">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                        <span className="text-sm text-green-600">
                          You save $
                          {calculateSavings(item.price, item.discountedPrice)}
                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-bold">
                        ${item.price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Colors */}
                  {item.colors && item.colors.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        Colors:
                      </p>
                      <div className="flex gap-2">
                        {item.colors.map((color) => (
                          <div
                            key={color}
                            className="h-5 w-5 rounded-full border"
                            style={{ backgroundColor: color.toLowerCase() }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Stock status */}
                  <div className="mb-4">
                    {item.stock > 0 ? (
                      <p className="text-sm text-green-600">
                        In Stock ({item.stock} available)
                      </p>
                    ) : (
                      <p className="text-sm text-rose-600">Out of Stock</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="default"
                      className="flex-1"
                      disabled={item.stock <= 0}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      className="px-3"
                      onClick={() => removeFromWishlist(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default WishlistPage;
