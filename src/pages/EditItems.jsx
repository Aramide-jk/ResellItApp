import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { ArrowLeft, Save } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useItems } from "../hooks/useItems";
import ImageUpload from "../componenets/ImageUpload";

import { GoArrowLeft, GoArrowUpLeft } from "react-icons/go";
import { IoIosSave } from "react-icons/io";

const categories = [
  "Textbooks",
  "Electronics",
  "Furniture",
  "Clothing",
  "Kitchenware",
  "Sports & Recreation",
  "Other",
];

const conditions = [
  { value: "new", label: "New" },
  { value: "like-new", label: "Like New" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "poor", label: "Poor" },
];

function EditItems() {
  const { id } = useParams();
  const { user } = useAuth();
  const { items, updateItem } = useItems();
  const navigate = useNavigate();

  const item = items.find((item) => item.id === id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: categories[0],
    condition: "good",
  });
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title,
        description: item.description,
        price: item.price.toString(),
        category: item.category,
        condition: item.condition,
      });
      setImages(item.images);
    }
  }, [item]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !item || !id) return;

    setIsLoading(true);

    updateItem(id, {
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      condition: formData.condition,
      images,
    });

    navigate(`/item/${id}`);
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Item not found
          </h2>
          <button onClick={() => navigate(-1)} className="btn-primary">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (item.sellerId !== user.id) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Unauthorized
          </h2>
          <p className="text-gray-600 mb-4">
            You can only edit your own items.
          </p>
          <button onClick={() => navigate(-1)} className="btn-primary">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
            <GoArrowUpLeft className="h-5 w-5" />

            <span>Back</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <IoIosSave className="h-6 w-6 text-green-600" />

            <h1 className="text-2xl font-bold text-gray-900">Edit Item</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2">
                Item Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., MacBook Pro 13-inch, Calculus Textbook, etc."
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                required
                value={formData.description}
                onChange={handleChange}
                className="input-field resize-none"
                placeholder="Describe your item's condition, features, and any other relevant details..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₦)
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  // step="0.01"
                  min="0"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="₦"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field">
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="condition"
                  className="block text-sm font-medium text-gray-700 mb-2">
                  Condition
                </label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="input-field">
                  {conditions.map((condition) => (
                    <option key={condition.value} value={condition.value}>
                      {condition.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <ImageUpload
              images={images}
              onImagesChange={setImages}
              maxImages={5}
            />

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn-secondary">
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary">
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditItems;
