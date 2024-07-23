import React from 'react'
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Box, tableCellClasses, Tooltip, Fade, Button} from '@mui/material';
import ModalTemplate from './ModalTemplate';
import ModalView from './ModalView';
import SearchBar from './SearchBar';
import Swal from "sweetalert2";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function ContentTable() {

  const [products, setProducts] = useState([]);
  const [newFilterData , setNewFilterData] = useState([]);
  const [viewProduct , setViewProduct] = useState(null);
  const [filterData, setFilterData] = useState('');
  // const [editId , setEditId] = useState('')
  
  // console.log(editId , ":editId")

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setProducts(json)
        setNewFilterData(json)
      })
      .catch(error => console.log("Error", error));
  },[]);

  useEffect(()=>{
    filterContent(filterData);
  },[filterData]);


  const handleAdd = (titleData, categoryData, descriptionData, imageData, priceData) => {
    console.log("................");
    fetch('https://fakestoreapi.com/products', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json' // Added this line
      },
      body: JSON.stringify(
        {
          title: titleData,
          price: priceData,
          description: descriptionData,
          image: imageData,
          category: categoryData
        }
      )
    })
      .then(res => res.json())
      .then(json => {
        setProducts([...products, json]);
        setNewFilterData([...products, json]);
        toast.success('Product added Successfully!', {
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
      })
      .catch(error => console.log("Error adding product:", error));
  }

  const truncate = (input, len) => {
    return input.length > len ? input.substring(0, len) + "..." : input;
  }

  const filterContent = (filterData)=>{
    let arr =  products.filter((product)=>{
      return product.title.toLowerCase().includes(filterData.toLowerCase()) ||
       product.category.toLowerCase().includes(filterData.toLowerCase()) ||
       product.description.toLowerCase().includes(filterData.toLowerCase()) ||
       product.price.toString().includes(filterData.toLowerCase());
     }); 
     setNewFilterData(arr)
  }

  // const filterProducts = filterContent(filterData);

  // const filterProducts = products.filter((product)=>{
  //  return product.title.toLowerCase().includes(filterData.toLowerCase()) ||
  //   product.category.toLowerCase().includes(filterData.toLowerCase()) ||
  //   product.description.toLowerCase().includes(filterData.toLowerCase()) ||
  //   product.price.toString().includes(filterData.toLowerCase());
  // }); 

  const handleUpdate = (index, titleData, categoryData, descriptionData, imageData, priceData) => {
    let newData = [...products];
    newData[index] = {
      ...newData[index],
      title: titleData,
      category: categoryData,
      description: descriptionData,
      image: imageData,
      price: priceData
    };
    setProducts(newData);
    setNewFilterData(newData);
    toast.success('Product editted Successfully!', {
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

  const handleDelete = (index)=>{
    Swal.fire({
      title: "Are you sure ?",
      text: "Do you want to delete this Product?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      cancelButtonColor: " #ff471a",
      confirmButtonColor: " #00b33c",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        const newData = [...products];
        newData.splice(index, 1);
        setProducts(newData);
        setNewFilterData(newData);


        Swal.fire({
          title: "Deleted!",
          text: "Your Product has been deleted.",
          icon: "success",
          confirmButtonColor: "#1976d2",
        });
        
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title:"Cancelled",
          text:"Your Product has not been deleted.",
          icon:"error",
          confirmButtonColor: "#1976d2",
        });
      }
    });
    
  }

  const handleView = (index)=>{
    fetch(`https://fakestoreapi.com/products/${index}`)
            .then(res=>res.json())
            .then(json=>setViewProduct(json));
  }

  return (
    <>
      <h1 align='center'>Product Details</h1>
      {/* <Button onClick={handleAdd}>XYZ</Button> */}
      <ToastContainer />
      <Box sx={{ padding: '0px 20px 20px 20px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'end', margin: '15px 0', gap: 3 }}>
          <SearchBar data={filterData} setData={setFilterData} />
          <ModalTemplate align="end" name="Add" func={handleAdd} />
        </Box>

        <TableContainer component={Paper} >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center" sx={{ fontWeight: 'bold', fontSize: 20, width: 20 }}>Id</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontWeight: 'bold', fontSize: 20, width: 20 }}>Image</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontWeight: 'bold', fontSize: 20, width: 20 }}>Category</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontWeight: 'bold', fontSize: 20, width: 20 }}>Title</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontWeight: 'bold', fontSize: 20, width: 20 }}>Description</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontWeight: 'bold', fontSize: 20, width: 20 }}>Price</StyledTableCell>
                <StyledTableCell align="center" sx={{ fontWeight: 'bold', fontSize: 20, width: 20 }}>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newFilterData?.map((product, index) => (
                <StyledTableRow
                  key={product.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <StyledTableCell align="center" component="th" scope="row">
                    {index + 1}
                  </StyledTableCell>
                  <StyledTableCell align="center"><img src={product.image} width={60} alt="" /></StyledTableCell>
                  <StyledTableCell align="center">{product.category}</StyledTableCell>

                  <StyledTableCell align="center"><Tooltip TransitionComponent={Fade} title={product.title} arrow>{truncate(product.title, 10)}</Tooltip></StyledTableCell>

                  <StyledTableCell align="center"><Tooltip TransitionComponent={Fade} title={product.description} arrow>{truncate(product.description, 20)}</Tooltip></StyledTableCell>
                  <StyledTableCell align="center" /*onClick={() =>  setEditId('2')*/>{product.price} $</StyledTableCell>
                  <StyledTableCell align="center">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <ModalTemplate name="Edit" func={handleUpdate} data={{...product,index}} 
/>
                      <ModalView index={product.id} func={()=>{
                        handleView(product.id);
                        setViewProduct(null);
                        }} product={viewProduct}/>
                      <Button variant="contained" onClick={()=>handleDelete(index)} sx={{margin:'10px 0'}}>Delete</Button>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Box>
    </>
  );
}
