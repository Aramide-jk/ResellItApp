import React from "react";
import { Search, Filter } from "lucide-react";
import { TbCurrencyNaira } from "react-icons/tb";

const categories = [
  "All Categories",
  "Textbooks",
  "Electronics",
  "Phone",
  "Laptop",
  "Furniture",
  "Clothing",
  "Kitchenware",
  "Sports & Recreation",
  "Other",
];

const conditions = [
  "All Conditions",
  "new",
  "like-new",
  "good",
  "fair",
  "poor",
];

function SearchFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedCondition,
  onConditionChange,
  priceRange,
  onPriceRangeChange,
}) {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
      <div className="flex items-center space-x-2 mb-6">
        <Filter className="h-4 w-4 text-gray-600" />
        <h3 className="text-sm sm:text-lg font-semibold text-gray-900">
          Search & Filter
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input-field pl-10"
          />
        </div>

        {/* Category */}
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="input-field">
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Condition */}
        <select
          value={selectedCondition}
          onChange={(e) => onConditionChange(e.target.value)}
          className="input-field">
          {conditions.map((condition) => (
            <option key={condition} value={condition}>
              {condition === "All Conditions"
                ? condition
                : condition.charAt(0).toUpperCase() + condition.slice(1)}
            </option>
          ))}
        </select>

        {/* Price Range */}
        <div className="flex space-x-2">
          <input
            type="number"
            min="0"
            placeholder="Min ₦"
            value={priceRange[0] || ""}
            onChange={(e) =>
              onPriceRangeChange([Number(e.target.value) || 0, priceRange[1]])
            }
            className="input-field"
          />
          <input
            type="number"
            min="0"
            placeholder="Max ₦"
            value={priceRange[1] || ""}
            onChange={(e) =>
              onPriceRangeChange([priceRange[0], Number(e.target.value)])
            }
            className="input-field"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchFilters;
