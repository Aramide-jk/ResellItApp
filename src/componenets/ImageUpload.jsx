import React, { useCallback } from "react";
import { Upload, X } from "lucide-react";

function ImageUpload({
  images,
  onImagesChange,
  maxImages = 5,
  className = "",
}) {
  const handleFileSelect = useCallback(
    (e) => {
      const files = Array.from(e.target.files || []);

      files.forEach((file) => {
        if (file.type.startsWith("image/") && images.length < maxImages) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const imageUrl = event.target?.result;
            onImagesChange([...images, imageUrl]);
          };
          reader.readAsDataURL(file);
        }
      });

      // Reset input
      e.target.value = "";
    },
    [images, maxImages, onImagesChange]
  );

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Images ({images.length}/{maxImages})
      </label>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={image}
              alt={`Upload ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg border border-gray-200"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}

        {images.length < maxImages && (
          <label className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-400 hover:bg-green-50 transition-colors">
            <div className="flex flex-col items-center">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">Add Image</span>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;
