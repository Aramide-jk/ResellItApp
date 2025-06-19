import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
// import { ArrowLeft, User, Phone, Calendar, Tag, Share2 } from "lucide-react";
import { useItems } from "../hooks/useItems";
import { useAuth } from "../context/AuthContext";
import { BsArrowLeft } from "react-icons/bs";
import { CiShare2 } from "react-icons/ci";
import { TfiAgenda } from "react-icons/tfi";
import { BiCalendar, BiPhone, BiPhoneCall, BiUser } from "react-icons/bi";
import { TbCurrencyNaira } from "react-icons/tb";
import ItemImages from "../componenets/Gallery";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";

function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items } = useItems();
  const { user } = useAuth();

  const item = items.find((item) => item.id === id);

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Item not found
          </h2>
          <p className="text-gray-600 mb-4">
            The item you're looking for doesn't exist.
          </p>
          <Link to="/" className="btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === item.sellerId;
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: `Check out this ${item.title} for $${item.price} on ResellIt!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleContact = () => {
    window.location.href = `tel:${item.sellerPhone}`;
  };

  const handleWhatsAppLink = (url) => {
    const newwindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newwindow) newwindow.opener = null;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600  transition-colors cursor-pointer hover:text-green-600">
            <BsArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors cursor-pointer">
            <CiShare2 className="h-5 w-5" />
            <span>Share</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images */}
            {/* <div className="p-6">
              {item.images.length > 0 ? (
                <div className="space-y-4">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                  {item.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {item.images.slice(1, 5).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${item.title} ${index + 2}`}
                          className="w-full h-20 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <TfiAgenda className="h-16 w-16 text-gray-400" />
                </div>
              )}
            </div> */}
            <ItemImages item={item} />

            {/* Details */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h1>
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl font-bold text-green-600 flex items-center">
                      {/* ${item.price} */}₦
                      {Number(item.price).toLocaleString()}
                    </span>

                    <span className="badge-blue">{item.category}</span>
                    <span
                      className={`badge ${
                        item.condition === "new"
                          ? "badge-green"
                          : item.condition === "like-new"
                          ? "badge-blue"
                          : "badge-orange"
                      }`}>
                      {item.condition === "like-new"
                        ? "Like New"
                        : item.condition.charAt(0).toUpperCase() +
                          item.condition.slice(1)}
                    </span>
                  </div>
                </div>
                {item.isSold && (
                  <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold">
                    SOLD
                  </span>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 ">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed first-letter:uppercase">
                  {item.description}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Seller Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <BiUser className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-700 capitalize">
                      {item.sellerName}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <BiPhone className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-700 ">{item.sellerPhone}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-700 ">
                    <FaWhatsapp className="h-5 w-5 text-gray-700" />
                    <button
                      onClick={() => {
                        handleWhatsAppLink(item.sellerWhatsAppLink);
                      }}
                      className="text-gray-900 cursor-pointer">
                      {item.sellerWhatsAppLink}
                    </button>
                  </div>
                  <div className="flex items-center space-x-3">
                    <BiCalendar className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-700">
                      Listed on {formatDate(item.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                {isOwner ? (
                  <div className="flex space-x-3">
                    <Link
                      to={`/edit-item/${item.id}`}
                      className="flex-1 btn-secondary text-center">
                      Edit Item
                    </Link>
                    <Link
                      to="/profile"
                      className="flex-1 btn-primary text-center">
                      Manage Items
                    </Link>
                  </div>
                ) : (
                  <>
                    {!item.isSold && user && (
                      <button
                        onClick={handleContact}
                        className="w-full btn-primary flex items-center justify-center space-x-2">
                        <BiPhone className="h-5 w-5" />
                        <span>Contact Seller</span>
                      </button>
                    )}
                    {!user && (
                      <div className="text-center">
                        <p className="text-gray-600 mb-4">
                          Please sign in to contact the seller
                        </p>
                        <Link to="/login" className="btn-primary">
                          Sign In
                        </Link>
                      </div>
                    )}
                    {item.isSold && (
                      <div className="text-center text-gray-600 py-4">
                        This item has been sold
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;
