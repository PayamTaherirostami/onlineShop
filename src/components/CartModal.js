import React, { useState } from 'react';

const CartModal = ({ cart, onClose, onRemove }) => {
  return (
    <div className="cart-modal">
      <div className="modal-content">
        <h2>Shopping Cart</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.Handle} - {item.Price}{' '}
              <button onClick={() => onRemove(item.Handle)} className="remove-from-cart-btn">
                Remove
              </button>
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="close-modal-btn">Close</button>
      </div>
    </div>
  );
};

const ProductList = () => {
  const [cart, setCart] = useState([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handleRemoveFromCart = (productHandle) => {
    setCart((prevCart) => prevCart.filter((item) => item.Handle !== productHandle));
  };

  const toggleCartModal = () => {
    setIsCartModalOpen(!isCartModalOpen);
  };

  return (
    <div>
      <h1>Product List</h1>
      <div className="product-grid">
        {/* Products will go here */}
      </div>

      {/* Cart Modal Trigger */}
      <button onClick={toggleCartModal} className="cart-icon-btn">
        View Cart ({cart.length})
      </button>

      {isCartModalOpen && <CartModal cart={cart} onClose={toggleCartModal} onRemove={handleRemoveFromCart} />}
    </div>
  );
};
