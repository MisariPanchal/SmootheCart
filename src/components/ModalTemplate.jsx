import React from 'react';
import { useState } from 'react';
import { Button, Modal, Box, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';

export default function ModalTemplate({ name, func, data }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    p: 4,
  };

  const errorStyle= { color: 'red', fontSize: '13px' };

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues = {
    title: data?.title || '',
    price: data?.price || '',
    description: data?.description || '',
    image: data?.image || '',
    category: data?.category || ''
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    fmk.setFieldValue(name, value.trimStart());
  };

  const onSubmit = (values) => {
    if (data && data.index !== undefined) {
      func(data.index, values.title, values.category, values.description, values.image, values.price);
    } else {
      func(values.title, values.category, values.description, values.image, values.price);
    }
    setOpen(false);
    fmk.resetForm();
  };
  

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .min(3, 'Title must be at least 3 characters')
      .max(100, 'Title must be at most 50 characters'),

    category: Yup.string()
      .required('Category is required')
      .min(3, 'Category must be at least 3 characters'),

    description: Yup.string()
      .required('Description is required')
      .min(10, 'Description must be at least 10 characters')
      .max(200, 'Description must be at most 200 characters'),

      image: Yup.string()
      .required('Please enter image URL')
      .url('Please enter a valid URL')
      .test(
        'is-image', // Unique identifier for the test
        'URL must be a valid image (jpg, jpeg, png, gif)', // Error message
        value => {
          if (!value) return false; 
          return /\.(jpg|jpeg|png|gif)$/i.test(value);
        }
      ),

    price: Yup.number()
      .required('Price is required')
      .typeError('Price must be a number')
      .positive('Price must be a positive number')
      .min(0.01, 'Price must be at least 0.01')
      .max(10000, 'Price must be at most 10000'),
  });
  
  const fmk = useFormik({
    initialValues,
    onSubmit, 
    validationSchema
  });



  return (
    <div>
      <Button variant="contained" onClick={handleOpen} sx={{ margin: '10px 0' }}>{name}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2>{name} Product</h2>
          <form style={{ textAlign: 'center' }} onSubmit={fmk.handleSubmit}>
            <TextField
              name='title'
              fullWidth
              sx={{ my: 2 }}
              className="outlined-basic"
              label="Title"
              variant="outlined"
              value={fmk.values.title}
              onChange={handleChange}
              helperText={fmk.touched.title && fmk.errors.title?<Typography sx={errorStyle}>{fmk.errors.title}</Typography>:""}
              onBlur={fmk.handleBlur}
            />
            <TextField
              name='category'
              fullWidth
              sx={{ my: 2 }}
              className="outlined-basic"
              label="Category"
              variant="outlined"
              value={fmk.values.category}
              onChange={handleChange}
              helperText={fmk.touched.category && fmk.errors.category?<Typography sx={errorStyle}>{fmk.errors.category}</Typography>:""}
              onBlur={fmk.handleBlur}
            />
            <TextField
              name='description'
              fullWidth
              sx={{ my: 2 }}
              className="outlined-basic"
              label="Description"
              variant="outlined"
              value={fmk.values.description}
              onChange={handleChange}
              helperText={fmk.touched.description && fmk.errors.description?<Typography sx={errorStyle}>{fmk.errors.description}</Typography>:""}
              onBlur={fmk.handleBlur}
            />
            <TextField
              name='image'
              fullWidth
              sx={{ my: 2 }}
              className="outlined-basic"
              label="Image"
              variant="outlined"
              value={fmk.values.image}
              onChange={handleChange}
              helperText={fmk.touched.image && fmk.errors.image?<Typography sx={errorStyle}>{fmk.errors.image}</Typography>:""}
              onBlur={fmk.handleBlur}
            />
            <TextField
              name='price'
              fullWidth
              sx={{ my: 2 }}
              className="outlined-basic"
              label="Price"
              variant="outlined"
              value={fmk.values.price}
              onChange={handleChange}
              helperText={fmk.touched.price && fmk.errors.price?<Typography sx={errorStyle}>{fmk.errors.price}</Typography>:""}
              onBlur={fmk.handleBlur}
            />
            <Button type='submit' variant="contained" >{name}</Button >
          </form>
        </Box>
      </Modal>
    </div>
  );
}
