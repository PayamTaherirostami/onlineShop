import React, { useState } from 'react';
import '../Pro.css'; // Assuming you will create styles for this component

const Pro = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePosition, setImagePosition] = useState({ top: 0, left: 0 });

  // Array of images (replace with actual image URLs)
  const images = [
    '/1.png',
    '/2.png',
    '/3.png',
    '/4.png',
    '/5.png',
    '/6.png',
    '/7.png',
    '/8.png',
    '/9.png',
    '/10.png',
    '/11.png',
    '/12.png',
    '/13.png',
    '/14.png',
    '/15.png',

  ];

  // Handle thumbnail click and set the position of the image
  const handleThumbnailClick = (image, position) => {
  alert("selected")
  };

  return (
    <div className="product">

      {/* Thumbnail Images Section */}
      <div className="thumbnails-container">
        <div className="thumbnail-scroll">
          {images.map((image, index) => (
            <div
              key={index}
              className="thumbnail"
              onClick={() => handleThumbnailClick(image, { top: index * 10, left: index * 10 })}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pro;
