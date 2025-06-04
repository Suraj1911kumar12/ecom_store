import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  {
    id: "fashion",
    name: "Fashion",
    description: "Curated style essentials for every occasion",
    image:
      "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "/products/fashion",
    subcategories: [
      { name: "Men's Wear", link: "/products/fashion/men" },
      { name: "Women's Wear", link: "/products/fashion/women" },
      { name: "Accessories", link: "/products/fashion/accessories" },
    ],
  },
  {
    id: "electronics",
    name: "Electronics",
    description: "Cutting-edge technology for modern living",
    image:
      "https://images.pexels.com/photos/1444416/pexels-photo-1444416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "/products/electronics",
    subcategories: [
      { name: "Smartphones", link: "/products/electronics/phones" },
      { name: "Laptops", link: "/products/electronics/laptops" },
      { name: "Audio", link: "/products/electronics/audio" },
    ],
  },
  {
    id: "home",
    name: "Home & Living",
    description: "Transform your space with elegant essentials",
    image:
      "https://images.pexels.com/photos/1571458/pexels-photo-1571458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "/products/home",
    subcategories: [
      { name: "Furniture", link: "/products/home/furniture" },
      { name: "Decor", link: "/products/home/decor" },
      { name: "Kitchen", link: "/products/home/kitchen" },
    ],
  },
  {
    id: "beauty",
    name: "Beauty",
    description: "Premium products for your self-care routine",
    image:
      "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "/products/beauty",
    subcategories: [
      { name: "Skincare", link: "/products/beauty/skincare" },
      { name: "Makeup", link: "/products/beauty/makeup" },
      { name: "Fragrances", link: "/products/beauty/fragrances" },
    ],
  },
  {
    id: "sports",
    name: "Sports & Fitness",
    description: "Gear up for your active lifestyle",
    image:
      "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "/products/sports",
    subcategories: [
      { name: "Exercise Equipment", link: "/products/sports/equipment" },
      { name: "Activewear", link: "/products/sports/activewear" },
      { name: "Nutrition", link: "/products/sports/nutrition" },
    ],
  },
  {
    id: "toys",
    name: "Toys & Games",
    description: "Fun for all ages",
    image:
      "https://images.pexels.com/photos/4709855/pexels-photo-4709855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "/products/toys",
    subcategories: [
      { name: "Educational", link: "/products/toys/educational" },
      { name: "Board Games", link: "/products/toys/games" },
      { name: "Outdoor", link: "/products/toys/outdoor" },
    ],
  },
];

const CategoriesPage = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary/90 py-20 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Categories</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Discover products curated for your lifestyle
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Featured Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-8">
            Featured Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.slice(0, 3).map((category) => (
              <Link
                key={category.id}
                href={category.link}
                className="group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div
                  className={cn(
                    "relative h-[300px] transition-all duration-500 rounded-xl overflow-hidden",
                    "group-hover:scale-[1.02]"
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 z-10" />
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transition-all duration-300 group-hover:translate-y-[-8px]">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-white/80 mb-4">{category.description}</p>
                    <div className="flex items-center text-white font-medium">
                      <span>Shop Now</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* All Categories */}
        <section>
          <h2 className="text-3xl font-bold tracking-tight mb-8">
            All Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={category.link}>
                  <div className="relative h-48">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <Link href={category.link}>
                    <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mb-4">{category.description}</p>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-gray-500">
                      Subcategories:
                    </h4>
                    <ul className="space-y-1">
                      {category.subcategories.map((subcategory) => (
                        <li key={subcategory.name}>
                          <Link
                            href={subcategory.link}
                            className="flex items-center text-gray-700 hover:text-primary transition-colors"
                          >
                            <ChevronRight className="h-4 w-4 mr-1" />
                            {subcategory.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CategoriesPage;
