import { Paper, Tabs, Tab, Box, Typography } from '@mui/material';
import { useState } from 'react';
import React from 'react'
import Login from './LogIn';
import SignUp from './SignUp';

export default function TabView() {

  const paperStyle={
    width:340,margin:"20px auto"
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index &&
          <Box>
            <Typography>{children}</Typography>
          </Box>
        }
      </div>
    );
  }

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <h2 style={{textAlign:'center'}}>Welcome to SmootheCart</h2>
    <Paper elevation={20} style={paperStyle}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
          variant='fullWidth'
          centered
        >
          <Tab label="Sign In" />
         
          <Tab label="Sign Up" />
        </Tabs>
        <TabPanel value={value} index={0}>
       <Login handleChange={handleChange}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <SignUp/>
      </TabPanel>
      </Paper>
    </>
  );
}
