import React from 'react';
import { TextField } from '@mui/material';

const style = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'black', // Default color
    },
    '&.Mui-focused fieldset': {
      borderColor: 'black', // Focused color
    },
  },
}

export default function SearchBar({data, setData}) {

  const searchData = (event)=>{
    setData(event.target.value);
  }

  return (
    <div>
      <TextField id="outlined-basic" placeholder="Search" variant="outlined" sx={style} onChange={searchData}/>
    </div>
  )
}
