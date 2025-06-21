import React, { useState, useMemo } from "react";
import SearchFilters from "../componenets/SearchFilters";
import ItemCard from "../componenets/ItemCard";
import { useItems } from "../hooks/useItems";
import { ShoppingBag, TrendingUp, Users, Recycle } from "lucide-react";
import { Footer } from "../componenets/Footer";

function Home() {
  const { items } = useItems();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedCondition, setSelectedCondition] = useState("All Conditions");
  const [priceRange, setPriceRange] = useState([0, 999999]);

  const filteredItems = useMemo(() => {
    return items
      .filter((item) => !item.isSold)
      .filter((item) => {
        const matchesSearch =
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === "All Categories" ||
          item.category === selectedCategory;
        const matchesCondition =
          selectedCondition === "All Conditions" ||
          item.condition === selectedCondition;
        const matchesPrice =
          item.price >= priceRange[0] && item.price <= priceRange[1];

        return (
          matchesSearch && matchesCategory && matchesCondition && matchesPrice
        );
      })
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }, [items, searchTerm, selectedCategory, selectedCondition, priceRange]);

  const stats = [
    {
      icon: ShoppingBag,
      label: "Items Available",
      value: items.filter((item) => !item.isSold).length,
    },
    {
      icon: TrendingUp,
      label: "Items Sold",
      value: items.filter((item) => item.isSold).length,
    },
    {
      icon: Users,
      label: "Active Sellers",
      value: new Set(items.map((item) => item.sellerId)).size,
    },
    // { icon: Recycle, label: "Items Reused", value: items.length },
  ];

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Hero Section */}
      <div className=" bg-gradient-to-br from-green-900 via-gray-800 to-slate-900 ">
        <div className="max-w-7xl  mx-auto px-2 sm:px-6 lg:px-8 py-6 sm:py-12 ">
          <div className="text-center">
            <h1 className="text-xl md:text-4xl text-gray-100 font-bold mb-4">
              Sell it. Buy it. Reuse it.
            </h1>
            <p className="text-sm md:text-lg mb-8 text-gray-200 max-w-3xl mx-auto">
              The student marketplace where your unused items find new purpose.
              Save money, reduce waste, and connect with your university
              community.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-6 sm:mt-12 grid-columns-3">
            {stats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="text-center">
                <div className="flex justify-center mb-2">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-7 md:w-7 text-green-200" />
                </div>
                <div className="text-sm sm:text-2xl font-bold text-gray-200">
                  {value}
                </div>
                <div className="text-xs sm:text-xl text-gray-200">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-  py-8 ">
        <SearchFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedCondition={selectedCondition}
          onConditionChange={setSelectedCondition}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
        />

        <div className="flex justify-between items-center mb-6 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Available Items ({filteredItems.length})
          </h2>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No items found
            </h3>
            <p className="text-gray-600">
              {items.length === 0
                ? "Be the first to post an item for sale!"
                : "Try adjusting your search filters to find what you're looking for."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-5 gap-2 sm:gap-6">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
