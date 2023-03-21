import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [items, setItems] = useState([
    { id: 1, name: "Shirt", price: 25, src: "https://cdn.pixabay.com/photo/2014/04/03/10/55/t-shirt-311732_960_720.png" },
    { id: 2, name: "Jeans", price: 35, src: "https://cdn.pixabay.com/photo/2014/04/03/00/30/pants-308497_960_720.png" },
    { id: 3, name: "Sneakers", price: 50, src: "https://cdn.pixabay.com/photo/2013/07/13/13/26/shoe-161027_960_720.png" },
    { id: 1, name: "Shirt", price: 25, src: "https://cdn.pixabay.com/photo/2014/04/03/10/55/t-shirt-311732_960_720.png" },
    { id: 2, name: "Jeans", price: 35, src: "https://cdn.pixabay.com/photo/2014/04/03/00/30/pants-308497_960_720.png" },
    { id: 3, name: "Sneakers", price: 50, src: "https://cdn.pixabay.com/photo/2013/07/13/13/26/shoe-161027_960_720.png" },
    
  ]);

  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeItem = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  const total = cart.reduce((acc, curr) => acc + curr.price, 0);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="shop-page">
      <div className="header">
        <h1>Shop</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="items">
        {items.map((item) => (
          <div key={item.id} className="item">
            <img src={item.src} className="image" alt="" />
            <h2>{item.name}</h2>
            <p>${item.price}</p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className="cart">
        <h2>Cart</h2>
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <h3>{item.name}</h3>
            <p>${item.price}</p>
            <button onClick={() => removeItem(item.id)}>Remove Item</button>
          </div>
        ))}
        <p>Total: ${total}</p>
      </div>
    </div>
  );
};

export default Home;
