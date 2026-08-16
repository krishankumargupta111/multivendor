import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, IconButton } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useAppSelector } from '../../redux/store';

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





export default function ProductTable() {

  const {sellerProduct}=useAppSelector(store=>store)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Images</StyledTableCell>
            <StyledTableCell align="right">Title</StyledTableCell>
            <StyledTableCell align="right">MRP</StyledTableCell>
            <StyledTableCell align="right">Selling Price</StyledTableCell>
            <StyledTableCell align="right">Update Stock</StyledTableCell>
             <StyledTableCell align="right">Update</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sellerProduct.products.map((item) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell component="th" scope="row">
            <div className='flex gap-1 flex-wrap'>

               {item.images?.map((img,index)=><img className='w-20 rounded-md'
                key={index} src={img}alt=""/> )} 
            </div>
              </StyledTableCell>
              <StyledTableCell align="right">{item.title}</StyledTableCell>
              <StyledTableCell align="right">₹{item.mrpPrice}</StyledTableCell>
              <StyledTableCell align="right">₹{item.sellingPrice}</StyledTableCell>
              <StyledTableCell align="right">
                <Button size='small'>
in_stock
                </Button>
              </StyledTableCell>
              <StyledTableCell align="right">
                <IconButton color='primary' className='bg-[teal]'>
                    <Edit/>
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
