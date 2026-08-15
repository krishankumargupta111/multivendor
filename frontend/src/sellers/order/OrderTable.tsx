import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Badge, Button, Chip, Menu,MenuItem } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fetchSellerOrders, updateOrderStatus } from '../../redux/features/seller/SellerOrderSlice';

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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const orderStatus=[
  {color:'#FFA500',label:'PENDING'},
   {color:'#F5BCBA',label:'PLACED'},
    {color:'#F5BCA',label:'CONFIRMED'},
     {color:'#1E90FF',label:'SHIPPED'},
      {color:'#32CD32',label:'DELIVERD'},
       {color:'#FF0000',label:'CANCELLED'},
]

export default function OrderTable() {
const [selectedOrderId, setSelectedOrderId] = React.useState("");
const {orders}=useAppSelector(store=>store.sellerOrder)
  const dispatch=useAppDispatch()
      const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
 const handleClick = (
  event: React.MouseEvent<HTMLButtonElement>,
  orderId: string
) => {
  setAnchorEl(event.currentTarget);
  setSelectedOrderId(orderId);
};
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateOrder=(id:any,status:any)=>{
    console.log("update order",id,status)
    handleClose()
    dispatch(updateOrderStatus({orderId:id,
      orderStatus:status,
      jwt:localStorage.getItem("jwt")}))
      handleClose()
  }


  useEffect(()=>{
    dispatch(fetchSellerOrders(localStorage.getItem("jwt")))
  },[])



  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Order Id</StyledTableCell>
            <StyledTableCell>Products</StyledTableCell>
            <StyledTableCell align="right">Shipping Address</StyledTableCell>
            <StyledTableCell align="right">Order Status</StyledTableCell>
            <StyledTableCell align="right">Update Button</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <StyledTableRow key={order._id}>
              <StyledTableCell component="th" scope="row">
                {order._id}
              </StyledTableCell>
              <StyledTableCell>
                <div className='flex gap-1 flex-wrap'>
                  {order.orderItems.map((item,index)=> <div key={index} className='flex gap-5'>
                    <img className='w-20 rounded-md' src={item.product.images[0]} alt=""/>
                    <div className='flex flex-col justify-between py-2'>
                        <h1>Title: {item.product.title}</h1>
                        <h1>Price: Rs.{item.sellingPrice}</h1>
                        <h1>Color: {item.product.color}</h1>
                        <h1>Size: {item.size}</h1>
                    </div>
                    </div> )}
                </div>
              </StyledTableCell>
              <StyledTableCell align="right">
                <p>
        {order?.shippingAddress?.address},{order?.shippingAddress?.locality},{" "}
        {order?.shippingAddress?.city},{order?.shippingAddress?.state},{" "}
        {order?.shippingAddress?.pincode}
    </p>
                </StyledTableCell>
              <StyledTableCell align="right">
               <Chip label={order.orderStatus}/>
              </StyledTableCell>
              <StyledTableCell align="right">
               <Button onClick={(e) => handleClick(e, order._id)}
                 color='primary' size='small'>
                    Status
                    </Button>
<Menu
        id="basic menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby':"basic-button",
          },
        }}
      >
        {orderStatus.map((status)=><MenuItem onClick={()=>handleUpdateOrder(selectedOrderId,status.label)}>
        {status.label}
        </MenuItem>)}
    
        
      </Menu>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
