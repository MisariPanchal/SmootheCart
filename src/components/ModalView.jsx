import React from 'react';
import { useState } from 'react';
import { Button, Modal, Box } from '@mui/material';

export default function ModalView({index, func, product}) {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    p: 4,
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    func(index);
  }
  const handleClose = () => setOpen(false);


  return (
    <div>
      <Button variant="contained" onClick={handleOpen} sx={{ margin: '10px 0' }}>View</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {product ? (
        <Box sx={style}>
          
            <>
          <h3>{product.title}</h3>
          <Box sx={{display:'flex', gap:4, alignItems:'center'}}>
            <img src={product.image} width={150} height={150} alt={product.title} />
            <p>{product.description}</p>
          </Box>
          <h3 sx={{alignProperty:'center'}}>{product.price} $</h3>
          </>
          
        </Box>
        ):(
          <p></p>
        )}
      </Modal>
    </div>
  )
}
