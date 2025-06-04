import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import Newsletter from "@/components/home/Newsletter";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export default function Home() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <main className="min-h-screen">
        <Hero />
        <FeaturedProducts />
        <CategoryShowcase />
        <Newsletter />
      </main>
    </ThemeProvider>
  );
}
