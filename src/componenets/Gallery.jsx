import React, { useState } from "react";

function ItemImages({ item }) {
  const [mainImage, setMainImage] = useState(item.images[0]);

  const handleImageClick = (clickedImage) => {
    if (clickedImage === mainImage) return;

    // Swap clicked image with main image
    const currentImages = item.images.filter((img) => img !== clickedImage);
    currentImages.unshift(clickedImage); // bring clicked image to front
    setMainImage(clickedImage);
  };

  return (
    <div className="p-6">
      {item.images.length > 0 ? (
        <div className="space-y-4">
          <img
            src={mainImage}
            alt={item.title}
            className="w-full h-96 object-cover rounded-lg"
          />

          {item.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {item.images
                .filter((img) => img !== mainImage)
                .slice(0, 4)
                .map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${item.title} ${index + 2}`}
                    onClick={() => handleImageClick(image)}
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
    </div>
  );
}

export default ItemImages;
