import { ShoppingBag } from "lucide-react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Define the interface for shop sites
interface ShopSite {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  categories: string[];
  url: string;
  healthUrl: string;
}

// Updated shop sites with health product focus
const shopSites: ShopSite[] = [
  {
    id: 1,
    name: "Amazon",
    description: "Shop vitamins, supplements, and wellness products for all your health needs.",
    imageUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    categories: ["Vitamins", "Supplements", "Health Devices"],
    url: "https://www.amazon.com",
    healthUrl: "https://www.amazon.com/s?k=health&crid=YR6JVVW4U595&sprefix=healt%2Caps%2C411&ref=nb_sb_noss_2"
  },
  {
    id: 2,
    name: "Flipkart",
    description: "Explore a range of health supplements and medical equipment.",
    imageUrl: "https://cdn.pixabay.com/photo/2015/08/25/16/12/lime-907124_1280.jpg",
    categories: ["Supplements", "Health Devices", "Wellness"],
    url: "https://www.flipkart.com",
    healthUrl: "https://www.flipkart.com/search?q=gym&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off"
  },
  {
    id: 3,
    name: "Nykaa",
    description: "Discover health-focused beauty and wellness products.",
    imageUrl: "https://cdn.pixabay.com/photo/2023/11/23/12/42/mask-8407989_1280.jpg",
    categories: ["Wellness", "Supplements", "Skincare"],
    url: "https://www.nykaa.com",
    healthUrl: "https://www.nykaa.com/search/result/?q=health&root=search&searchType=Manual&sourcepage=home"
  },
  {
    id: 4,
    name: "Healthkart",
    description: "India's leading store for supplements and health products.",
    imageUrl: "https://cdn.pixabay.com/photo/2021/02/03/11/32/gym-5977600_1280.jpg",
    categories: ["Supplements", "Vitamins", "Fitness"],
    url: "https://www.healthkart.com",
    healthUrl: "https://www.healthkart.com"
  },
  {
    id: 5,
    name: "Netmeds",
    description: "Online pharmacy for medicines and health supplements.",
    imageUrl: "https://cdn.pixabay.com/photo/2021/03/27/05/10/pills-6127501_1280.jpg",
    categories: ["Medicines", "Supplements", "Wellness"],
    url: "https://www.netmeds.com",
    healthUrl: "https://www.netmeds.com/catalogsearch/result/medicine/all"
  },
  {
    id: 6,
    name: "1mg",
    description: "Your one-stop shop for medicines and health products.",
    imageUrl: "https://cdn.pixabay.com/photo/2021/02/03/09/02/glucometer-5977173_1280.jpg",
    categories: ["Medicines", "Vitamins", "Health Devices"],
    url: "https://www.1mg.com",
    healthUrl: "https://www.1mg.com/categories/health-supplements-139"
  }
];

const Shop = () => {
  return (
    <MainLayout>
      <div className="elysium-container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-navy-900 to-purple-900 text-white overflow-hidden min-h-[calc(100vh-64px)]">
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-10">
          <ShoppingBag className="h-10 w-10 text-purple-400" />
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Health & Wellness Stores
          </h1>
        </div>

        {/* Description */}
        <p className="text-lg text-gray-300 mb-12 max-w-3xl">
          Explore top online stores offering a wide range of health products, from vitamins and supplements to medical devices and wellness essentials.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {shopSites.map((site) => (
            <Card
              key={site.id}
              className="group flex flex-col overflow-hidden rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-navy-800 border border-navy-700 hover:bg-gradient-to-br hover:from-navy-800 hover:to-purple-900"
            >
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={site.imageUrl}
                  alt={site.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Card Content */}
              <CardHeader className="p-6">
                <CardTitle className="text-2xl font-semibold text-white">{site.name}</CardTitle>
                <CardDescription className="mt-2 text-gray-300 line-clamp-2">
                  {site.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6 pt-0 flex-grow">
                <div className="flex flex-wrap gap-2">
                  {site.categories.map((category) => (
                    <Badge
                      key={category}
                      className="bg-purple-900 text-purple-200 font-medium px-3 py-1 rounded-full"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              {/* Card Footer */}
              <CardFooter className="p-6 pt-0">
                <a
                  href={site.healthUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center transition-colors duration-200">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Shop Health Products
                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Slope Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900 to-transparent transform -skew-y-3" />
      </div>
    </MainLayout>
  );
};

export default Shop;