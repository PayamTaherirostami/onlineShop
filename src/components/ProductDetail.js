import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Papa from 'papaparse';
import '../ProductDetail.css';
import Pro from './Pro'; // Import the Pro component

const ProductDetail = () => {
  const { style } = useParams(); // Get the style number from the URL params
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const csvUrl = '../../Kids asli.csv'; // Adjust the path to your CSV file

    fetch(csvUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load CSV file');
        }
        return response.text();
      })
      .then((csvData) => {
        Papa.parse(csvData, {
          complete: (result) => {
            const data = result.data;
            const filteredVariants = data
              .slice(1) // Skip the header row
              .filter((item) => item[13] === style) // Filter by style number
              .map((item) => ({
                Handle: item[29],
                DefaultImageSrc: item[24],
                HoverImageSrc: item[24],
                Price: item[1],
                Description: item[3],
                Color: item[7], // Assuming Color is in column 4
                Size: item[17],  // Assuming Size is in column 5
                Style: item[13], // Style number
              }));

            setVariants(filteredVariants);
            setLoading(false);
            if (filteredVariants.length > 0) {
              setSelectedVariant(filteredVariants[0]); // Default to the first variant
            }
          },
          header: false,
          skipEmptyLines: true,
        });
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [style]);

  // Handle changes to color or size selection
  const handleVariantChange = (e, type) => {
    const selectedValue = e.target.value;
    const updatedVariant = variants.find(
      (variant) => variant[type] === selectedValue
    );
    if (updatedVariant) {
      setSelectedVariant(updatedVariant);
    }
  };

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  // Handle Add to Cart functionality
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.Handle === product.Handle);
      if (existingProduct) {
        alert(`${product.Style} is already in your cart.`);
        return prevCart;
      }
      const newCart = [...prevCart, product];
      return newCart;
    });
    alert(`This has been added to your cart!`);
  };

  // Handle Remove from Cart functionality
  const handleRemoveFromCart = (productHandle) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.Handle !== productHandle);
      return newCart;
    });
    alert(`The item has been removed from your cart!`);
  };
  const images = [
   { "src":'/1.png',"Alt":"$2"},
   { "src":'/2.png',"Alt":"$3"},
   { "src":'/3.png',"Alt":"$2"},
   { "src":'/4.png',"Alt":"$4"},
   { "src":'/5.png',"Alt":"$2"},
   { "src":'/6.png',"Alt":"$2"},
   { "src":'/7.png',"Alt":"$6"},
   { "src":'/8.png',"Alt":"$2"},
   { "src":'/9.png',"Alt":"$2"},
   { "src":'/10.png',"Alt":"$12"},
   { "src":'/11.png',"Alt":"$2"},
   { "src":'/12.png',"Alt":"$2"},
   { "src":'/13.png',"Alt":"$22"},
   { "src":'/14.png',"Alt":"$2"},
   { "src":'/15.png',"Alt":"$2"},
 

  ];
    // Handle thumbnail click and set the position of the image
    const handleThumbnailClick = (image, position) => {
        alert("selected")
        };
  return (
    <div className="product-detail">
      {selectedVariant && (
        <>
          <div className="spotlight">
            <img
              src={selectedVariant.DefaultImageSrc}
              alt={selectedVariant.Handle}
              className="main-image"
            />
          </div>
          <div className="product-info">
            <h3>{selectedVariant.Handle}</h3>
            <div
              className="product-details2"
              style={{ fontSize: '20px', marginLeft: '30px' }}
              dangerouslySetInnerHTML={{ __html: selectedVariant.Description }}
            />
            <p className="price">Price: ${selectedVariant.Price}</p>
          </div>

          <div className="variant-options">
            <div className="option">
              <label htmlFor="color">Select Color:</label>
              <select
                id="color"
                value={selectedVariant.Color}
                onChange={(e) => handleVariantChange(e, 'Color')}
              >
                {Array.from(new Set(variants.map((variant) => variant.Color))) // Unique colors
                  .map((color, index) => (
                    <option key={index} value={color}>
                      {color}
                    </option>
                  ))}
              </select>
            </div>

            <div className="option" style={{ marginBottom: 30 }}>
              <label htmlFor="size">Select Size:</label>
              <select
                id="size"
                value={selectedVariant.Size}
                onChange={(e) => handleVariantChange(e, 'Size')}
              >
                {Array.from(new Set(variants.map((variant) => variant.Size))) // Unique sizes
                  .map((size, index) => (
                    <option key={index} value={size}>
                      {size}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <h4>Available designs:</h4>
          <div className="product-container">
            {/* Pass variants to the Pro child component */}
            {/* <Pro variants={variants} /> */}
          </div>
              <div className="product">

      {/* Thumbnail Images Section */}
      <div className="thumbnails-container">
      <div className="thumbnail-scroll">
      {images.map((image, index) => (
        <div
          key={index}
          className="thumbnail"
          onClick={() => handleThumbnailClick(image, { top: index * 10, left: index * 10 })}
          onMouseEnter={() => setHoveredIndex(index)} // Set the hovered index
          onMouseLeave={() => setHoveredIndex(null)} // Clear the hovered index
        >
          <img src={image.src} alt={`Thumbnail ${index + 1}`} />
          {hoveredIndex === index && (
            <div className="alt-text">
              {image.Alt}
            </div>
          )}
        </div>
      ))}
    </div>
 
      </div>
    </div>
        </>
      )}

      {/* Cart Section */}
      <div className="cart">
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.Handle} - ${item.Price}{' '}
                <button
                  onClick={() => handleRemoveFromCart(item.Handle)}
                  className="remove-from-cart-btn"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
