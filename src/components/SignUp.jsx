import { Grid, Paper, Avatar, TextField, Checkbox, FormControlLabel, Button, Typography, Radio, RadioGroup, FormLabel, FormControl, FormHelperText } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';

export default function SignUp() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  
  const initialValues = {
    name:'',
    email:'',
    gender:'',
    phoneNum:'',
    password:'',
    confirmPassword:'',
    termsAndConditions:false
  };

  const onSubmit = (values) => {
    console.log("Form Submitted with values:", values);
  
    try {

      let existingItems = JSON.parse(localStorage.getItem('items')) || [];
  
      const isExistingItemEmail = existingItems.find(item => item.email === values.email);
      const isExistingItemNum = existingItems.find(item => item.phoneNum === values.phoneNum);

      if (isExistingItemEmail && isExistingItemNum) {
        toast.error('Email & Phone Number already Exists!!', {
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
        fmk.setFieldValue('email', '');
        fmk.setFieldValue('phoneNum', '');
        fmk.setSubmitting(false);
        return;
      }
  
      if (isExistingItemEmail) {
        toast.error('Email already Exists!!', {
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
        fmk.setFieldValue('email', '');
        fmk.setSubmitting(false);
        return;
      }

      if (isExistingItemNum) {
        toast.error('Phone Number already Exists!!', {
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
        fmk.setFieldValue('phoneNum', '');
        fmk.setSubmitting(false);
        return;
      }
  
      const updatedItems = [...existingItems, values];
  
      localStorage.setItem('items', JSON.stringify(updatedItems));
  
      setTimeout(() => {
        fmk.resetForm();
        fmk.setSubmitting(false);
      }, 2000);

    } catch (error) {
      console.error("Error storing data in localStorage", error);
    }
  }
  

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(2, "Name must be at least 2 characters").max(20, "Name can't be longer than 20 characters").required("Please Enter Name."),
    email: Yup.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Enter a valid email").max(50, "Email can't be longer than 50 characters").required("Please Enter Email."),
    gender: Yup.string().oneOf(['male', 'female', 'other'], "Required").required("Please Select Gender."),
    phoneNum: Yup.string().matches(/^\d{0,10}$/, "Phone number must be exactly 10 digits").required("Please Enter Phone Number."),
    password: Yup.string()
    // .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[&$@_]).+$/, "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[&$@_]/, "Password must contain at least one special character")
      .min(8, "Password must be at least 8 characters")
      .required("Please Enter Password."),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Passwords must match").required("Please Confirm Password."),
    termsAndConditions: Yup.boolean().oneOf([true], "Accept the Terms and Conditions.").required("Accept the Terms and Conditions.")
  });

  const handleChange = (event) => {
    const {name, value, checked, type} = event.target;
    if (name === 'phoneNum') {
      const numericValue = value.replace(/\D/g, ''); 
      fmk.setFieldValue(name, numericValue.slice(0, 10));
    } else if (type === 'checkbox') {
      fmk.setFieldValue(name, checked);
    } else {
      fmk.setFieldValue(name, value.trimStart());
    }
  }

  const fmk = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  });

  const paperStyle = {
    padding: 20,
    width: 300,
    margin: 'auto'
  };

  const errorStyle = {
    color: 'red',
    fontSize: '13px'
  };

  const avatarStyle = {
    backgroundColor: '#1bbd7e',
  };

  const headerStyle = {
    margin: 0
  };

  const btnStyle = {
    margin: '10px 0'
  };

  return (
    <Grid>
      <ToastContainer />
      <Paper style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}><AddCircleOutlineIcon /></Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
          <Typography variant='caption'>Please fill this form to create an account !</Typography>
        </Grid>
        <form onSubmit={fmk.handleSubmit}>
          <TextField label="Name" onChange={handleChange} onBlur={fmk.handleBlur} value={fmk.values.name} name='name' variant="standard" placeholder='Enter Name' fullWidth helperText={fmk.touched.name && fmk.errors.name?<Typography style={errorStyle}>{fmk.errors.name}</Typography>:""}  />

          <TextField label="Email" onChange={handleChange} onBlur={fmk.handleBlur} value={fmk.values.email} name='email' variant="standard" placeholder='Enter Email' fullWidth helperText={fmk.touched.email && fmk.errors.email?<Typography style={errorStyle}>{fmk.errors.email}</Typography>:""} />

          <FormControl style={{ marginTop: 5 }}>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="Gender"
              name="gender"
              onChange={handleChange} value={fmk.values.gender}
              style={{ display: 'initial' }}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
          <FormHelperText>
          {fmk.touched.gender && fmk.errors.gender?<div style={{color:'red'}}>{fmk.errors.gender}</div>:""}
          </FormHelperText>

          <TextField label="Phone Number" onChange={handleChange} onBlur={fmk.handleBlur} value={fmk.values.phoneNum} name='phoneNum' variant="standard" placeholder='Enter Phone Number' fullWidth  helperText={fmk.touched.phoneNum && fmk.errors.phoneNum?<Typography style={errorStyle}>{fmk.errors.phoneNum}</Typography>:""}/>

          <TextField type={showPassword?'text':'password'} label="Password" onChange={handleChange} onBlur={fmk.handleBlur}  value={fmk.values.password} name='password' variant="standard" placeholder='Enter Password' fullWidth  helperText={fmk.touched.password && fmk.errors.password?<Typography style={errorStyle}>{fmk.errors.password}</Typography>:""}
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

          <TextField type={showConfirmPassword?'text':'password'} label="Confirm Password" onChange={handleChange} onBlur={fmk.handleBlur}  value={fmk.values.confirmPassword} name='confirmPassword' variant="standard" placeholder='Confirm Password' fullWidth  helperText={fmk.touched.confirmPassword && fmk.errors.confirmPassword?<Typography style={errorStyle}>{fmk.errors.confirmPassword}</Typography>:""}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            )
          }}
          />

          <FormControlLabel control={
            <Checkbox name='termsAndConditions' onChange={handleChange} checked={fmk.values.termsAndConditions} color='primary' />
          } label="I accept the terms and conditions." />
          <FormHelperText>
          {fmk.touched.termsAndConditions && fmk.errors.termsAndConditions?<div style={{color:'red'}}>{fmk.errors.termsAndConditions}</div>:""}
          </FormHelperText>

          <Button type='submit' disabled={fmk.isSubmitting} color='primary' style={btnStyle} fullWidth variant="contained">{fmk.isSubmitting?"Loading...":"Sign up"}</Button>
        </form>
      </Paper>
    </Grid>
  )
}
