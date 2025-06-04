import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  {
    id: "fashion",
    name: "Fashion",
    description: "Curated style essentials",
    image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "/products/fashion",
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "Latest tech & gadgets",
    image: "https://images.pexels.com/photos/1444416/pexels-photo-1444416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "/products/electronics",
  },
  {
    id: "home",
    name: "Home & Living",
    description: "Elegant home essentials",
    image: "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "/products/home",
  }
];

const CategoryShowcase = () => {
  return (
    <section className="py-16 px-4 container mx-auto">
      <h2 className="text-3xl font-bold tracking-tight mb-8">Shop By Category</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <Link 
            key={category.id}
            href={category.link} 
            className="group overflow-hidden rounded-xl"
          >
            <div className={cn(
              "relative h-[400px] transition-all duration-500 rounded-xl overflow-hidden",
              "group-hover:scale-[1.03]"
            )}>
              {/* Image with overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 z-10" />
              <Image 
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transition-all duration-300 group-hover:translate-y-[-8px]">
                <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                <p className="text-white/80 mb-4">{category.description}</p>
                <div className="flex items-center text-white font-medium">
                  <span>Explore</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryShowcase;