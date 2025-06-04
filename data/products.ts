import { Product } from "@/types";

// Helper function to calculate discounted price
const calculateDiscountedPrice = (price: number, discount: number) => {
  return +(price * (1 - discount / 100)).toFixed(2);
};

export const featuredProducts: Product[] = [
  // Trending Products
  {
    id: "prod-t1",
    name: "Premium Leather Crossbody Bag",
    brand: "Luxemart",
    category: "trending",
    description: "Handcrafted from premium full-grain leather, this crossbody bag combines elegance with practicality. Features multiple compartments and an adjustable strap.",
    price: 189.99,
    discount: 15,
    discountedPrice: calculateDiscountedPrice(189.99, 15),
    rating: 4.8,
    reviewCount: 124,
    isNew: false,
    images: [
      "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    colors: ["Black", "Brown", "Tan"],
    stock: 45,
    features: [
      "Full-grain leather construction",
      "Multiple interior compartments",
      "Adjustable shoulder strap",
      "Brass hardware",
      "Interior zip pocket"
    ]
  },
  {
    id: "prod-t2",
    name: "Wireless Noise-Canceling Headphones",
    brand: "SonicPro",
    category: "trending",
    description: "Experience immersive audio with these premium wireless headphones featuring active noise cancellation, 40-hour battery life, and premium sound quality.",
    price: 299.99,
    discount: 10,
    discountedPrice: calculateDiscountedPrice(299.99, 10),
    rating: 4.7,
    reviewCount: 356,
    isNew: false,
    images: [
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    colors: ["Black", "Silver", "Navy"],
    stock: 78,
    features: [
      "Active noise cancellation",
      "40-hour battery life",
      "Premium audio drivers",
      "Quick charge (5 min = 2 hrs)",
      "Voice assistant compatible"
    ]
  },
  {
    id: "prod-t3",
    name: "Modern Minimalist Watch",
    brand: "Chrono",
    category: "trending",
    description: "A sleek timepiece with minimalist design, featuring a Japanese quartz movement, sapphire crystal, and genuine leather strap.",
    price: 149.99,
    discount: 0,
    discountedPrice: 149.99,
    rating: 4.6,
    reviewCount: 92,
    isNew: true,
    images: [
      "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    colors: ["Black/Silver", "Brown/Gold", "Blue/Silver"],
    stock: 34,
    features: [
      "Japanese quartz movement",
      "Sapphire crystal glass",
      "Genuine leather strap",
      "3 ATM water resistance",
      "Stainless steel case"
    ]
  },
  {
    id: "prod-t4",
    name: "Smart Home Security Camera",
    brand: "SafeGuard",
    category: "trending",
    description: "Keep your home secure with this HD smart camera featuring motion detection, night vision, two-way audio, and cloud storage options.",
    price: 129.99,
    discount: 20,
    discountedPrice: calculateDiscountedPrice(129.99, 20),
    rating: 4.5,
    reviewCount: 217,
    isNew: false,
    images: [
      "https://images.pexels.com/photos/3900437/pexels-photo-3900437.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/3900437/pexels-photo-3900437.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    colors: ["White", "Black"],
    stock: 56,
    features: [
      "1080p HD video",
      "Motion detection alerts",
      "Night vision up to 30ft",
      "Two-way audio",
      "Works with Alexa & Google Home"
    ]
  },
  
  // Bestseller Products
  {
    id: "prod-b1",
    name: "Premium Cotton Bedding Set",
    brand: "SleepLux",
    category: "bestsellers",
    description: "Transform your bedroom with this luxurious 100% organic cotton bedding set. Includes a duvet cover, fitted sheet, and two pillowcases.",
    price: 179.99,
    discount: 0,
    discountedPrice: 179.99,
    rating: 4.9,
    reviewCount: 432,
    isNew: false,
    images: [
      "https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    colors: ["White", "Gray", "Sage", "Navy"],
    sizes: ["Twin", "Full", "Queen", "King"],
    stock: 89,
    features: [
      "100% GOTS certified organic cotton",
      "400 thread count percale weave",
      "Naturally hypoallergenic",
      "OEKO-TEX certified",
      "Easy care machine washable"
    ]
  },
  {
    id: "prod-b2",
    name: "Ceramic Pour-Over Coffee Set",
    brand: "BrewCraft",
    category: "bestsellers",
    description: "Elevate your coffee ritual with this elegant ceramic pour-over set. Includes a dripper, server, and two cups for the perfect brew experience.",
    price: 89.99,
    discount: 0,
    discountedPrice: 89.99,
    rating: 4.8,
    reviewCount: 178,
    isNew: false,
    images: [
      "https://images.pexels.com/photos/2736497/pexels-photo-2736497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/2736497/pexels-photo-2736497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    colors: ["Cream", "Black", "Terracotta"],
    stock: 42,
    features: [
      "Hand-crafted ceramic",
      "Precise pour spout",
      "Heat-resistant handle",
      "Reusable stainless steel filter",
      "Dishwasher safe"
    ]
  },
  {
    id: "prod-b3",
    name: "Ultra-Slim Portable Power Bank",
    brand: "PowerPro",
    category: "bestsellers",
    description: "Never run out of battery with this sleek 10,000mAh power bank featuring fast charging, dual USB ports, and USB-C compatibility.",
    price: 49.99,
    discount: 10,
    discountedPrice: calculateDiscountedPrice(49.99, 10),
    rating: 4.7,
    reviewCount: 647,
    isNew: false,
    images: [
      "https://images.pexels.com/photos/5499303/pexels-photo-5499303.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/5499303/pexels-photo-5499303.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    colors: ["Black", "Silver", "Rose Gold"],
    stock: 125,
    features: [
      "10,000mAh capacity",
      "18W Power Delivery",
      "Quick Charge 3.0",
      "Dual USB-A and USB-C ports",
      "Ultra-slim aluminum design"
    ]
  },
  {
    id: "prod-b4",
    name: "Premium Yoga Mat",
    brand: "ZenFlex",
    category: "bestsellers",
    description: "Enhance your yoga practice with this eco-friendly, non-slip yoga mat featuring excellent cushioning and alignment markers.",
    price: 79.99,
    discount: 15,
    discountedPrice: calculateDiscountedPrice(79.99, 15),
    rating: 4.8,
    reviewCount: 312,
    isNew: false,
    images: [
      "https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    colors: ["Ocean Blue", "Forest Green", "Sunset Orange", "Lavender"],
    stock: 67,
    features: [
      "6mm eco-friendly TPE material",
      "Non-slip textured surface",
      "Alignment markers",
      "Carrying strap included",
      "Free from PVC, phthalates, and latex"
    ]
  },
  
  // New Arrival Products
  {
    id: "prod-n1",
    name: "Smart Fitness Tracker Watch",
    brand: "PulseTrack",
    category: "new",
    description: "Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, sleep tracking, GPS, and a 7-day battery life.",
    price: 149.99,
    discount: 0,
    discountedPrice: 149.99,
    rating: 4.6,
    reviewCount: 87,
    isNew: true,
    images: [
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    colors: ["Black", "Silver", "Rose Gold"],
    stock: 94,
    features: [
      "24/7 heart rate monitoring",
      "Sleep quality analysis",
      "Built-in GPS",
      "50+ sport modes",
      "7-day battery life"
    ]
  },
  {
    id: "prod-n2",
    name: "Artisanal Ceramic Dinner Set",
    brand: "ArtisanTable",
    category: "new",
    description: "Elevate your dining experience with this handcrafted ceramic dinner set. Each piece is uniquely glazed and includes settings for four people.",
    price: 219.99,
    discount: 0,
    discountedPrice: 219.99,
    rating: 4.9,
    reviewCount: 42,
    isNew: true,
    images: [
      "https://images.pexels.com/photos/6127325/pexels-photo-6127325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/6127325/pexels-photo-6127325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    colors: ["Natural", "Azure", "Terracotta"],
    stock: 28,
    features: [
      "16-piece set (4 place settings)",
      "Handcrafted by artisans",
      "Microwave and dishwasher safe",
      "Unique glaze variations",
      "Lead and cadmium free"
    ]
  },
  {
    id: "prod-n3",
    name: "Sustainable Bamboo Bathroom Set",
    brand: "EcoLiving",
    category: "new",
    description: "Transform your bathroom with this eco-friendly bamboo set including a toothbrush holder, soap dispenser, and storage containers.",
    price: 79.99,
    discount: 0,
    discountedPrice: 79.99,
    rating: 4.7,
    reviewCount: 36,
    isNew: true,
    images: [
      "https://images.pexels.com/photos/7480269/pexels-photo-7480269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/7480269/pexels-photo-7480269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    colors: ["Natural", "White"],
    stock: 52,
    features: [
      "Sustainable bamboo construction",
      "Water-resistant finish",
      "5-piece complete set",
      "Minimalist design",
      "Plastic-free packaging"
    ]
  },
  {
    id: "prod-n4",
    name: "Premium Wireless Earbuds",
    brand: "AudioPulse",
    category: "new",
    description: "Experience crystal-clear audio with these premium wireless earbuds featuring active noise cancellation, touch controls, and 24-hour battery life.",
    price: 159.99,
    discount: 0,
    discountedPrice: 159.99,
    rating: 4.8,
    reviewCount: 64,
    isNew: true,
    images: [
      "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    colors: ["Black", "White", "Navy"],
    stock: 73,
    features: [
      "Active noise cancellation",
      "Touch controls",
      "24-hour battery life with case",
      "IPX7 water resistance",
      "High-definition audio codec support"
    ]
  }
];