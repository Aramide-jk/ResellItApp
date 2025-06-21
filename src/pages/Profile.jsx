import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { User, Plus, Edit3, Trash2, CheckCircle, Package } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useItems } from "../hooks/useItems";
import ImageUpload from "../componenets/ImageUpload";
import { FiPackage, FiTrash2 } from "react-icons/fi";
import { CiCircleCheck } from "react-icons/ci";
import { FaPlus, FaUserAlt, FaUserEdit } from "react-icons/fa";
import {
  BiBusSchool,
  BiLogoWhatsapp,
  BiMailSend,
  BiPhone,
  BiSolidGraduation,
} from "react-icons/bi";

function Profile() {
  const { user, updateProfile } = useAuth();
  const { getUserItems, markAsSold, deleteItem } = useItems();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    whatsAppLink: user?.whatsAppLink || "",
    university: user?.university || "",
  });
  const [profileImages, setProfileImages] = useState(
    user?.profileImage ? [user.profileImage] : []
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Please sign in
          </h2>
          <Link to="/login" className="btn-primary">
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  const userItems = getUserItems(user.id);
  const activeItems = userItems.filter((item) => !item.isSold);
  const soldItems = userItems.filter((item) => item.isSold);

  const handleSaveProfile = () => {
    updateProfile({
      ...editData,
      profileImage: profileImages[0] || undefined,
    });
    setIsEditing(false);
  };

  const handleMarkAsSold = (itemId) => {
    if (window.confirm("Mark this item as sold?")) {
      markAsSold(itemId);
    }
  };

  const handleDeleteItem = (itemId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this item? This action cannot be undone."
      )
    ) {
      deleteItem(itemId);
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 overflow-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 overflow-auto">
          <div className="sm:flex sm:items-start  sm:space-x-6  items-center">
            <div className="flex-shrink-0 md:mb-0 mb-4 md:place-self-auto place-self-center">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="h-24 w-24 rounded-xl object-cover"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaUserAlt className="h-12 w-12 text-green-600" />
                </div>
              )}
            </div>

            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4 ">
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    className="input-field"
                    placeholder="Full Name"
                  />
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) =>
                      setEditData({ ...editData, phone: e.target.value })
                    }
                    className="input-field"
                    placeholder="Phone Number"
                  />
                  <input
                    type="url"
                    value={editData.whatsAppLink}
                    onChange={(e) =>
                      setEditData({ ...editData, whatsAppLink: e.target.value })
                    }
                    className="input-field "
                    placeholder="Optional WhatsApp Link"
                  />
                  <input
                    type="text"
                    value={editData.university}
                    onChange={(e) =>
                      setEditData({ ...editData, university: e.target.value })
                    }
                    className="input-field"
                    placeholder="University"
                  />
                  <ImageUpload
                    images={profileImages}
                    onImagesChange={setProfileImages}
                    maxImages={1}
                    className="mt-4"
                  />
                  <div className="flex space-x-3">
                    <button onClick={handleSaveProfile} className="btn-primary">
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="btn-secondary">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 first-letter:uppercase">
                    {user.name}
                  </h1>
                  <div className="flex items-center space-x-1">
                    <BiMailSend className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-600">{user.email}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BiPhone className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-600">{user.phone}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BiLogoWhatsapp className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-600">{user.whatsAppLink}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BiSolidGraduation className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-600">{user.university}</p>
                  </div>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-4 ml-20 flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors">
                    <FaUserEdit className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-900">
                {userItems.length}
              </div>
              <div className="text-sm text-gray-600">Total Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-700">
                {soldItems.length}
              </div>
              <div className="text-sm text-gray-600">Sold</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {activeItems.length}
              </div>
              <div className="text-sm text-gray-600">Active</div>
            </div>
          </div>
        </div>

        {/* Post New Item */}
        <div className="mb-8">
          <Link
            to="/post-item"
            className="flex items-center justify-center space-x-2 w-full py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors">
            <FaPlus className="h-6 w-6 text-gray-400" />
            <span className="text-gray-600 font-medium">Post New Item</span>
          </Link>
        </div>

        {/* Active Items */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <FiPackage className="h-5 w-5" />

            <span>Active Items ({activeItems.length})</span>
          </h2>

          {activeItems.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              No active items. Post something to get started!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeItems.map((item) => (
                <div key={item.id} className="card p-4">
                  <div className="flex space-x-4">
                    {item.images.length > 0 ? (
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                        <FiPackage className="h-8 w-8 text-gray-400" />
                      </div>
                    )}

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        ₦{Number(item.price).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        Listed {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <Link
                      to={`/item/${item.id}`}
                      className="flex-1 btn-secondary text-center text-sm py-2">
                      View
                    </Link>
                    <Link
                      to={`/edit-item/${item.id}`}
                      className="flex-1 btn-secondary text-center text-sm py-2">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleMarkAsSold(item.id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-4 rounded-md transition-colors">
                      Mark Sold
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="btn-danger text-sm py-2 px-4">
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sold Items */}
        {soldItems.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <CiCircleCheck className="h-5 w-5 text-green-600" />

              <span>Sold Items ({soldItems.length})</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {soldItems.map((item) => (
                <div key={item.id} className="card p-4 opacity-75">
                  <div className="flex space-x-4">
                    {item.images.length > 0 ? (
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                        <FiPackage className="h-8 w-8 text-gray-400" />
                      </div>
                    )}

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            ₦{Number(item.price).toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            Sold {formatDate(item.updatedAt)}
                          </p>
                        </div>
                        <span className="badge-green text-xs">SOLD</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Profile;
