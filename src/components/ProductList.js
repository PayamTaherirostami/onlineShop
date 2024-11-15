import React, { useState, useEffect, useRef} from 'react';
import Papa from 'papaparse';
import '../ProductList.css';
import { useNavigate } from 'react-router-dom';






const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState({
    Toddler: false,
    Infant: false,
    Youth:false,
    "Sweatshirts": false,
    'Full Zip Hoodie': false,
    Pants: false,
    Shorts: false,
    'T-Shirts': false,
    Caps:false,
    Activewear:false,
    Outerwear:false,
    'Long Sleeve':false,
    'Polos/Knits':false
  });


  const itemsPerPage = 20;
  const navigate = useNavigate();


  const videoRef = useRef(null);


useEffect(() => {
  if (videoRef.current) {
    videoRef.current.play();
  }
}, []);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  // Load CSV Data
  const loadCSV = async () => {
    const csvUrl = '../Kids for productList.csv'; // Adjust the path

    try {
      const response = await fetch(csvUrl);
      if (!response.ok) throw new Error('Failed to load CSV file');
      const csvData = await response.text();

      Papa.parse(csvData, {
        complete: (result) => {
          const data = result.data;
          const parsedProducts = data.slice(1).map((item) => ({
            Handle: item[29],
            DefaultImageSrc: item[2],
            HoverImageSrc: item[23],
            Price: item[1],
            Description: item[3],
            Style: item[13],
            Tags: item[6]?.split(',').map(tag => tag.trim()) || [], // Ensure tags are split and cleaned up
          }
        )
      );

          setProducts(parsedProducts);
          setLoading(false);
        },
        header: false,
        skipEmptyLines: true,
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCSV();
  }, []);

  // Add to cart functionality
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.Handle === product.Handle);
      if (existingProduct) {
        alert(`${product.Style} is already in your cart.`);
        return prevCart;
      }
      return [...prevCart, product];
    });
    navigate(`/product/${product.Style}`);
  };

  // Filter products by selected tags and search term
  const filteredProducts = products.filter((product) => {
    // Check if any of the selected tags match the product's tags
    const tagMatch = Object.keys(selectedTags)
      .filter(tag => selectedTags[tag]) // Get the selected tags
      .some(tag => product.Tags.includes(tag)); // Check if product has the tag

    // Search term matching
    const searchMatch =
      product.Handle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.Description.toLowerCase().includes(searchTerm.toLowerCase());

    return (Object.keys(selectedTags).some(tag => selectedTags[tag]) ? tagMatch : true) && searchMatch;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  const handleTagChange = (e) => {
    setSelectedTags((prevTags) => ({
      ...prevTags,
      [e.target.name]: e.target.checked,
    }));
    setCurrentPage(1); // Reset to first page when tag filter changes
  };

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <>
      <div className="product-list-container">
        {/* Sidebar with Filters */}
        <div className="sidebar">
          <h3>Filters</h3>

          {/* Search Box */}
          <div className="search-box">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by name or description..."
            />
          </div>

          {/* Tag Filters */}
          <div className="checkbox-filters">
            {Object.keys(selectedTags).map(tag => (
              <label key={tag}>
                <input
                  type="checkbox"
                  name={tag}
                  checked={selectedTags[tag]}
                  onChange={handleTagChange}
                />
                {tag}
              </label>
            ))}
          </div>
          {/* <video controls width="100%"  ref={videoRef} autoPlay muted playsInline> */}
          <video width="100%" autoPlay muted loop>
    <source src="/videos/1.mp4" type="video/webm" />
    <source src="/videos/1.mp4" type="video/mp4" />
    Sorry, your browser doesn't support videos.
</video>
        </div>

        {/* Main Content (Product Grid) */}
        <div className="product-grid">
          {currentProducts.length > 0 ? (
            currentProducts.map((product, index) => (
              <div key={index} className="product-card" onClick={() => handleAddToCart(product)}>
                <div className="image-container">
                  <img
                    src={product.DefaultImageSrc}
                    alt={product.Handle}
                    className="product-image default-image"
                  />
                  <img
                    src={product.HoverImageSrc}
                    alt={`${product.Handle} Hover`}
                    className="product-image hover-image"
                  />
                </div>
                <div className="product-details">
                  <h3 className="product-handle">{product.Handle}</h3>
                  <p className="product-price">Price: From ${product.Price}</p>
                </div>
                <div
                  className="product-details2"
                  style={{ fontSize: '0.9rem', marginLeft: '30px' }}
                  dangerouslySetInnerHTML={{ __html: product.Description }}
                />
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="pagination" style={{ marginBottom: 30 }}>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </>
  );
};

export default ProductList;
