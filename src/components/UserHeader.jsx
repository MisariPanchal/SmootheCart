import React, { useContext } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Button, Badge } from '@mui/material';
import logo from '../images/Logo.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; 
import Swal from "sweetalert2";

export default function UserHeader() {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const imgOnClick = () => {
    navigate('/user-page');
  };

  const handleLogout = () => {
    const getProducts = JSON.parse(localStorage.getItem('items'));
    const updateProducts = getProducts.map((item) => {
      return item.isLogin ? { ...item, isLogin: false } : item;
    });
    localStorage.setItem('items', JSON.stringify(updateProducts));
    navigate('/SmootheCart');
    Swal.fire({
      title: "Logged out successfully!!",
      icon: "success",
      confirmButtonColor:'#28a745'
    });
  };

  // Calculate total number of items in the cart
  const totalItemsInCart = Object.values(cart).reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#1E3A8A" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ display: "flex", flexGrow: 1 }}>
            <img src={logo} height={70} alt="SmootheCart Logo" onClick={imgOnClick} style={{ cursor: 'pointer' }} />
            <p>SmootheCart</p>
          </Typography>
          <Button variant='contained' sx={{ backgroundColor: '#1976D2', color: '#FFFFFF', marginRight: 2 }} onClick={() => navigate('/cart-page')}>
            <Badge badgeContent={totalItemsInCart} color="error">
              Cart &nbsp;<ShoppingCartIcon />
            </Badge>
          </Button>
          <Button variant='contained' sx={{ backgroundColor: '#1976D2', color: '#FFFFFF' }} onClick={handleLogout}>
            Logout &nbsp;<LogoutIcon />
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
