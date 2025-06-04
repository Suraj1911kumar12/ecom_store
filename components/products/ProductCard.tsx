"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard = ({ product, className }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { addToWishlist } = useWishlist();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product);

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsWishlisted(!isWishlisted);
    addToWishlist(product);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${
        isWishlisted ? "removed from" : "added to"
      } your wishlist.`,
    });
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div
        className={cn(
          "group relative bg-background rounded-lg border overflow-hidden transition-all duration-300",
          "hover:shadow-md hover:-translate-y-1",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary/30">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className={cn(
              "object-cover transition-transform duration-500",
              isHovered && "scale-105"
            )}
          />

          {product.discount > 0 && (
            <Badge className="absolute top-3 left-3 z-10 bg-destructive text-destructive-foreground">
              {product.discount}% OFF
            </Badge>
          )}

          {product.isNew && (
            <Badge className="absolute top-3 right-3 z-10">NEW</Badge>
          )}

          {/* Action buttons overlay */}
          <div
            className={cn(
              "absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 transition-opacity duration-300",
              isHovered && "opacity-100"
            )}
          >
            <div className="flex gap-2">
              <Button
                size="icon"
                className="rounded-full bg-white text-black hover:bg-white/90"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="sr-only">Add to cart</span>
              </Button>
              <Button
                size="icon"
                variant="outline"
                className={cn(
                  "rounded-full bg-white/20 backdrop-blur-sm border-white/30",
                  isWishlisted && "text-destructive"
                )}
                onClick={handleToggleWishlist}
              >
                <Heart
                  className={cn("h-4 w-4", isWishlisted && "fill-current")}
                />
                <span className="sr-only">Add to wishlist</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Product details */}
        <div className="p-4">
          <div className="flex items-center mb-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3 w-3",
                    i < Math.floor(product.rating)
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">
              ({product.reviewCount})
            </span>
          </div>

          <h3 className="font-medium text-sm truncate">{product.name}</h3>
          <p className="text-xs text-muted-foreground mb-2 truncate">
            {product.brand}
          </p>

          <div className="flex items-center">
            {product.discount > 0 ? (
              <>
                <span className="font-semibold">
                  ${product.discountedPrice.toFixed(2)}
                </span>
                <span className="text-muted-foreground text-sm line-through ml-2">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-semibold">${product.price.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
