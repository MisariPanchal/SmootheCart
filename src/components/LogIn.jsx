import { Grid, Paper, Avatar, TextField, Checkbox, FormControlLabel, Button, Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LogIn() {

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const paperStyle = {
    padding: 20,
    height: '67vh',
    width: 300,
    margin: '50px auto',
  };

  const avatarStyle = {
    backgroundColor: '#1bbd7e',
  };

  const btnStyle = {
    margin: '10px 0'
  };

  const errorStyle = {
    color: 'red',
    fontSize: '13px'
  };

  const initialValues = {
    email:'',
    password:'',
    rememberMe:false
  };
  const onSubmit = (values)=>{
    console.log(values);

    const getProducts = JSON.parse(localStorage.getItem('items'));

    const productExists = getProducts.find(item => item.email === values.email && item.password === values.password && item.isDelete !== true);

    if(productExists){
      const updateProducts = getProducts.map((item)=>{
        return item.email === values.email ? {...item, isLogin:true} : item;
      });
      localStorage.setItem('items', JSON.stringify(updateProducts));
      if(productExists.isAdmin === true){
        navigate('/product-details');
      }
      else{
        navigate('/user-page');
      }
    }
    else{
      toast.error('Invalid Email or Password', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
    
    // setTimeout(()=>{
    //   fmk.resetForm();
    //   fmk.setSubmitting(false);
    // }, 2000);
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Enter valid email").required("Please Enter Email."),
    password: Yup.string().min(8,"Password minimum length should be 8").required("Please Enter Password."),
  });

  const handleChange = (event) => {
    const {name, value} = event.target;
    fmk.setFieldValue(name, value.trimStart());
  }

  const fmk = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  });

  return (
    <Grid>
      <ToastContainer />
      <Paper style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
          <h2>Sign In</h2>
        </Grid>
        <form onSubmit={fmk.handleSubmit}>
        <TextField name='email' value={fmk.values.email} onBlur={fmk.handleBlur} onChange={handleChange} label="Email" variant="standard" placeholder='Enter Email' fullWidth  helperText={fmk.errors.email && fmk.touched.email ?<Typography style={errorStyle}>{fmk.errors.email}</Typography>:""}/>

        <TextField type={showPassword?'text':'password'} name='password' value={fmk.values.password} onBlur={fmk.handleBlur} onChange={handleChange} label="Password" variant="standard" placeholder='Enter Password' fullWidth  helperText={fmk.errors.password && fmk.touched.password ?<Typography style={errorStyle}>{fmk.errors.password}</Typography>:""}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
        />

        <FormControlLabel control={
          <Checkbox name='remembereMe'
          onChange={handleChange} 
          value={fmk.values.remembereMe} color='primary' />
        } label="Remember Me" />
        <Button type='submit' color='primary' style={btnStyle} fullWidth variant="contained" >Sign in</Button>
        </form>
        {/* <Typography>
          <Link href="#" underline="hover">Forgot password ?</Link>
        </Typography>
        <Typography>Do you have an account ?
          <Link href="#" underline="hover" onClick={()=>handleChange('event', 1)}>Sign Up</Link>
        </Typography> */}
      </Paper>
    </Grid>
  )
}
