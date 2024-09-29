// CategoryPage.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import UserCategory from './UserCategory';
import UserHeader from './UserHeader';
import { Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { CartContext } from "../context/CartContext";

export default function CategoryPage() {
  const location = useLocation();
  const { category } = location.state || { category: 'defaultCategory' };
  const [categoryProducts, setCategoryProducts] = useState([]);
  const { addToCart } = useContext(CartContext); 

  useEffect(() => {
    if (category) {
      fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then((res) => res.json())
        .then((json) => {
          setCategoryProducts(json);
        })
        .catch((error) => console.log('Error', error));
    }
  }, [category]);

  const truncate = (input, len) => input.length > len ? input.substring(0, len) + "..." : input;

  return (
    <>
      <UserHeader />
      <UserCategory />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', padding: '20px', margin: 30 }}>
        {categoryProducts.length > 0 ? (
          categoryProducts.map((product) => (
            <div key={product.id} style={{ margin: 15, border: '1px solid #ccc', borderRadius: '10px', padding: '30px', textAlign: 'center' }}>
              <img src={product.image} alt={product.title} height={80} />
              <h2>{truncate(product.title, 20)}</h2>
              <p>${product.price}</p>
              <div style={{ display: 'flex', justifyContent: "center", gap: 15 }}>
                <Button variant='contained' onClick={() => addToCart(product)}> 
                  Cart&nbsp;<ShoppingCartIcon />
                </Button>
                <Button variant='contained'>Buy&nbsp;<ShoppingBagIcon /></Button>
              </div>
            </div>
          ))
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </>
  );
}
