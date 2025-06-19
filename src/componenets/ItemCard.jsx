import React from "react";
import { Link } from "react-router-dom";
import { Calendar, User, Tag } from "lucide-react";

const conditionColors = {
  new: "badge-green",
  "like-new": "badge-blue",
  good: "badge-blue",
  fair: "badge-orange",
  poor: "badge-orange",
};

function ItemCard({ item }) {
  const formatDate = (date) => {
    return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
      Math.ceil(
        (new Date(date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      ),
      "day"
    );
  };

  return (
    <Link to={`/item/${item.id}`} className="block">
      <div className="card overflow-hidden">
        <div className="relative">
          {item.images.length > 0 ? (
            <img
              src={item.images[0]}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <Tag className="h-12 w-12 text-gray-400" />
            </div>
          )}
          {item.isSold && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
                SOLD
              </span>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <span
              className={`${
                conditionColors[item.condition]
              } text-xs font-medium`}>
              {item.condition === "like-new"
                ? "Like New"
                : item.condition.charAt(0).toUpperCase() +
                  item.condition.slice(1)}
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2 capitalize">
            {item.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2 capitalize ">
            {item.description}
          </p>

          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-green-600">
              {/* ₦{item.price} */} ₦{Number(item.price).toLocaleString()}
            </span>
            <span className="badge-blue text-xs">{item.category}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>{item.sellerName}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(item.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ItemCard;
