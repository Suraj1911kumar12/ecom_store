// "use client";

import { notFound } from "next/navigation";
import { featuredProducts } from "@/data/products";
import ProductDetails from "@/components/products/ProductDetails";
import RelatedProducts from "@/components/products/RelatedProducts";

interface ProductPageProps {
  params: { id: string };
}

// ✅ This generates all static params (for SSG)
export async function generateStaticParams() {
  return featuredProducts.map((product) => ({
    id: product.id,
  }));
}

export function generateMetadata({ params }: ProductPageProps) {
  const product = featuredProducts.find((p) => p.id === params.id);

  if (!product) {
    return {
      title: "Product Not Found | Luxemart",
    };
  }

  return {
    title: `${product.name} | Luxemart`,
    description: product.description,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = featuredProducts.find((p) => p.id === params.id);

  if (!product) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetails product={product} />
      <RelatedProducts
        currentProductId={product.id}
        category={product.category}
      />
    </div>
  );
}
