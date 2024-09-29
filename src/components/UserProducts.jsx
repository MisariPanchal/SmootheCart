import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Button, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { CartContext } from "../context/CartContext";

export default function UserProducts() {

  const [productList, setProductList] = useState([]);
  const { addToCart } = useContext(CartContext);

  const fetchProducts = async () => {

    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setProductList(json);
      })
      .catch(error => console.log("Error", error));
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const truncate = (input, len) => {
    return input.length > len ? input.substring(0, len) + "..." : input;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ alignSelf: "flex-start", paddingLeft: 20, width: "100%", boxSizing: "border-box" }}>
        <h1>All Products</h1>
        <Swiper slidesPerView={5} navigation={true} modules={[Navigation]} className="mySwiper" style={{ display: "flex", justifyContent: "center", paddingLeft:"37px",marginRight:"20px"}}>
          {productList ? productList.map((product) => (
            <SwiperSlide>
              <Box
                height={300}
                width={250}
                my={4}
                // mx={}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                // gap={4}
                // p={2}
                sx={{ border: '2px solid grey' }}
              >
                <img src={product.image} height={80} width={80} alt="" />
                <h3 style={{marginBottom:0}}>{truncate(product.title, 10)}</h3>
                <p>{product.price}$</p>
                <div style={{display:"flex", gap:7}}>
                  <Button variant='contained' onClick={()=>addToCart(product)}>Cart &nbsp;<ShoppingCartIcon/></Button>
                  <Button variant='contained'>Buy &nbsp;<ShoppingBagIcon/></Button>
                </div>
              </Box>
            </SwiperSlide>
          )) : <p>Loading...</p>}
        </Swiper>
      </div>
    </div>
  )
}
