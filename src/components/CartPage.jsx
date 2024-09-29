import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Box, Button, Typography, Divider, Modal } from '@mui/material';
import UserHeader from './UserHeader';
import DeleteIcon from '@mui/icons-material/Delete';
import QRCode from 'react-qr-code';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

export default function CartPage() {
  const { cart, addToCart, removeFromCart, deleteFromCart } = useContext(CartContext);

  const truncate = (input, len) => input.length > len ? input.substring(0, len) + "..." : input;

  const cartItems = Object.values(cart);

  const subAmount = cartItems.reduce((sum, item) => sum += item.price * item.quantity, 0);
  const totalAmount = subAmount + subAmount * 0.05;

  return (
    <div>
      <UserHeader />
      <h1 style={{ textAlign: "center", margin: 0, marginTop: 10 }}>Cart</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 50px' }}>
        <div style={{ flex: 1 }}>
          {cartItems.length > 0 ? (
            cartItems.map((cartItem) => (
              <Box
                key={cartItem.id}
                sx={{
                  border: "1px solid grey",
                  padding: 4,
                  margin: 5,
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  gap: 4
                }}
              >
                <img src={cartItem.image} alt="" height={100} width={100} />
                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3>{truncate(cartItem.title, 15)}</h3>
                    <div style={{ display: "flex", justifyContent: 'flex-start', gap: 10 }}>
                      <Button
                        variant='outlined'
                        style={{ margin: "10px 0" }}
                        onClick={() => removeFromCart(cartItem)}
                      >
                        -
                      </Button>
                      <p>{cartItem.quantity}</p>
                      <Button
                        variant='outlined'
                        style={{ margin: "10px 0" }}
                        onClick={() => addToCart(cartItem)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <p>Price: {cartItem.price * cartItem.quantity}$</p>
                    <Button sx={{ justifySelf: "end", color: '#212121' }} onClick={() => deleteFromCart(cartItem)} ><DeleteIcon /></Button>
                  </div>
                </div>
              </Box>
            ))
          ) : (
            <h2>Cart is Empty!!</h2>
          )}
        </div>
        {cartItems.length > 0 ?
          <Box
            sx={{
              border: "1px solid grey",
              padding: 4,
              margin: 5,
              borderRadius: "10px",
              width: "300px",
              height: "250px",  // Adjust height as needed
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3
            }}
          >
            <Typography>Sub Amount : {subAmount.toFixed(2)} $</Typography>
            <Typography>Tax : 5%</Typography>
            <Divider sx={{ borderColor: 'black', borderWidth: 0.5, width: "100%" }} fullWidth />
            <Typography>Total Amount : {totalAmount.toFixed(2)} $</Typography>
            <PaymentModal />
          </Box>
          : <p />
        }
      </div>
    </div>
  );
}

// PaymentModal component remains the same

export function PaymentModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Pay
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Close Button */}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'grey.500',
            }}
          >
            <CloseIcon />
          </IconButton>

          <QRCode
            value="https://www.google.com"
            bgColor="#ffffff"
            fgColor="#000000"
            level="Q"
            size={128}
          />
          <Typography>[Scan Me]</Typography>
          <Divider sx={{ borderColor: 'black', width: '100%', mt: 2, mb: 2 }}>or</Divider>
          <Button variant="outlined" color="secondary">
            Cash on delivery
          </Button>
          <Divider sx={{ borderColor: 'black', width: '100%', mt: 2, mb: 2 }}>or</Divider>
          <Button variant="outlined" color="secondary">
            Pay on delivery
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
