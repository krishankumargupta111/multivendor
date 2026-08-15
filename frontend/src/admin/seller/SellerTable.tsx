import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { InputLabel, MenuItem, Select,FormControl, type SelectChangeEvent, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchAllCoupon } from '../../redux/features/admin/CouponSlice';
import { fetchSellers } from '../../redux/features/seller/SellerSlice';


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



const accountStatus=[
    {
        status:"PENDING_VERIFICATION",
        title:"Pending Verification",
        description:"Account is created but not yet verified"
    },
      {
        status:"ACTIVE",
        title:"Active",
        description:"Account is active and in good standing"
    },
      {
        status:"SUSPENDED",
        title:"Suspended",
        description:"Account is temporarily suspended,possibly due to violation "

    },
      {
        status:"DEACTIVATED",
        title:"Deactivated",
        description:"Account is deactivated,user may have chosen to deactivate it"
    },

      {
        status:"BANNED",
        title:"Banned",
        description:"Account is permanently banned due to server violatoins"
    },
      {
        status:"CLOSED",
        title:"Closed",
        description:"Account is permanently closed,possibly at user request"
    },

]

export default function SellerTable() {
  const dispatch=useAppDispatch()
  const seller=useAppSelector(store=>store.seller)

    const [status,setStatus]=useState(accountStatus[0].status)
    const  handleChange=(event:SelectChangeEvent)=>{
        setStatus(event.target.value)
    }


    useEffect(()=>{
      dispatch(fetchSellers(status))
    },[status])
    
    return (
<>
    <div className='pb-5 w-60'>
        <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Status</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={status}
    label="status"
    onChange={handleChange}
  >
    {accountStatus.map((item)=><MenuItem value={item.status}>{item.status}</MenuItem>)
}
  </Select>
</FormControl>
    </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Seller Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Mobile</StyledTableCell>
            <StyledTableCell align="right">GSTIN</StyledTableCell>
              <StyledTableCell align="right">Business Name</StyledTableCell>
            <StyledTableCell align="right">Account Status</StyledTableCell>
            <StyledTableCell align="right">Change Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {seller?.sellers.map((item) => (
            <StyledTableRow key={item._id}>
              <StyledTableCell component="th" scope="row">
          {item.sellerName}
              </StyledTableCell>
              <StyledTableCell align="right">{item.email}</StyledTableCell>
              <StyledTableCell align="right">{item.mobile}</StyledTableCell>
              <StyledTableCell align="right">{item.GSTIN}</StyledTableCell>
              <StyledTableCell align="right">{item.businessDetail?.businessName}</StyledTableCell>
                <StyledTableCell align="right">{item.accountStatus}</StyledTableCell>
                
                
                 <Button >update</Button>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
