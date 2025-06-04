"use client";

import { useState, useEffect } from "react";
import { featuredProducts } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const ProductGrid = () => {
  const [products, setProducts] = useState(featuredProducts);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = () => {
    if (loading) return;
    
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // For demo purposes, we'll just duplicate the products with new IDs
      const newProducts = featuredProducts.map(product => ({
        ...product,
        id: `${product.id}-${page}`
      }));
      
      setProducts([...products, ...newProducts]);
      setPage(page + 1);
      
      // After page 3, pretend there are no more products
      if (page >= 3) {
        setHasMore(false);
      }
      
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button 
            onClick={loadMore} 
            variant="outline" 
            disabled={loading}
            className="min-w-[150px]"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;