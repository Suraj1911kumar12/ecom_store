"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Minus, Plus, Heart, Share2, ShoppingBag, Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isWishlisted ? "removed from" : "added to"} your wishlist.`,
    });
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div>
      {/* Breadcrumbs */}
      <nav className="flex text-sm mb-6">
        <Link href="/" className="text-muted-foreground hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <Link href="/products" className="text-muted-foreground hover:text-foreground">
          Products
        </Link>
        <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
        <span className="text-foreground font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden bg-secondary/20 rounded-lg">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {product.discount > 0 && (
              <Badge className="absolute top-4 left-4 z-10 bg-destructive text-destructive-foreground">
                {product.discount}% OFF
              </Badge>
            )}
            {product.isNew && (
              <Badge className="absolute top-4 right-4 z-10">NEW</Badge>
            )}
          </div>

          {/* Thumbnail navigation */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "relative w-20 h-20 rounded border-2 overflow-hidden flex-shrink-0 transition-all",
                    selectedImage === index
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <Image
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                {product.brand}
              </p>
              
              <div className="flex items-center">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-1.5">
                  ({product.reviewCount})
                </span>
              </div>
            </div>

            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
            
            <div className="flex items-center mt-2">
              {product.discount > 0 ? (
                <>
                  <span className="text-2xl font-bold">
                    ${product.discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-lg line-through text-muted-foreground ml-2">
                    ${product.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <p className="flex items-center mt-2 text-sm">
              <span className={product.stock > 0 ? "text-green-600" : "text-destructive"}>
                {product.stock > 0 ? (
                  <>
                    <Check className="inline-block mr-1 h-4 w-4" />
                    In Stock
                  </>
                ) : (
                  "Out of Stock"
                )}
              </span>
              {product.stock > 0 && product.stock < 10 && (
                <span className="ml-2 text-amber-600">
                  (Only {product.stock} left)
                </span>
              )}
            </p>
          </div>

          <div className="space-y-6">
            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-3">Color</h3>
                <RadioGroup
                  defaultValue={selectedColor}
                  onValueChange={setSelectedColor}
                  className="flex flex-wrap gap-3"
                >
                  {product.colors.map((color) => (
                    <div key={color} className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value={color} 
                        id={`color-${color}`} 
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`color-${color}`}
                        className="peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary peer-data-[state=checked]:ring-offset-2 rounded-md border px-3 py-2 cursor-pointer"
                      >
                        {color}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium">Size</h3>
                  <Button variant="link" size="sm" className="h-auto p-0">
                    Size Guide
                  </Button>
                </div>
                <RadioGroup
                  defaultValue={selectedSize}
                  onValueChange={setSelectedSize}
                  className="flex flex-wrap gap-3"
                >
                  {product.sizes.map((size) => (
                    <div key={size} className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value={size} 
                        id={`size-${size}`} 
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`size-${size}`}
                        className="peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground min-w-[60px] text-center rounded-md border px-3 py-2 cursor-pointer"
                      >
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Quantity Selector */}
            <div>
              <h3 className="text-sm font-medium mb-3">Quantity</h3>
              <div className="flex items-center border rounded-md w-fit">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-none"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease</span>
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-none"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
            </div>

            {/* Add to Cart and Wishlist */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="flex-1 gap-2"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                className={cn(isWishlisted && "text-destructive")}
                onClick={handleToggleWishlist}
              >
                <Heart className={cn("h-5 w-5", isWishlisted && "fill-current")} />
                <span className="sr-only md:not-sr-only md:ml-2">
                  {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
                </span>
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          </div>

          {/* Product Description */}
          <div className="pt-6 border-t">
            <Tabs defaultValue="description">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="pt-4">
                <p className="text-muted-foreground">{product.description}</p>
              </TabsContent>
              
              <TabsContent value="features" className="pt-4">
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {product.features?.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </TabsContent>
              
              <TabsContent value="specifications" className="pt-4">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {product.specifications ? (
                    Object.entries(product.specifications).map(([key, value], index) => (
                      <div key={index} className={index % 2 === 0 ? "bg-muted/50 p-2" : "p-2"}>
                        <span className="font-medium">{key}:</span>{" "}
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground col-span-2">No specifications available.</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;