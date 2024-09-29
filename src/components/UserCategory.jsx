import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function UserCategory() { // Added setSelectedCategory prop
  const [categoryList, setCategoryList] = useState([]);
  const navigate = useNavigate();

  const getCategories = () => {
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then((json) => {
        setCategoryList(json);
      })
      .catch((error) => console.log('Error', error));
  };

  useEffect(() => {
    getCategories();
  }, []);

  const onClickCategory = (category)=>{
    navigate('/category-page', { state: { category } });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ borderBottom: '2px solid black' }}>Categories</h1>
      <div>
        {categoryList.map((category, index) => (
          <Button
            key={index} 
            variant='outlined'
            sx={{ mx: 1, color: 'black', borderColor: 'black' }}
            onClick={()=>onClickCategory(category)} 
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}
