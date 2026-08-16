import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, Chip, CircularProgress, Box } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect } from 'react';
import { fetchAllCoupon, deleteCoupon } from '../../redux/features/admin/CouponSlice';

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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function Coupon() {
  const dispatch = useAppDispatch();
  
  const { coupons, loading } = useAppSelector((store: any) => store.adminCoupon);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    dispatch(fetchAllCoupon(jwt));
  }, [dispatch]);

  const handleDeleteCoupon = (id: string) => {
    const jwt = localStorage.getItem("jwt");
    dispatch(deleteCoupon({ id, jwt }));
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading && (!coupons || coupons.length === 0)) {
    return (
     <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "200px",
  }}
>
  <CircularProgress />
</Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Coupon Code</StyledTableCell>
            <StyledTableCell align="right">Discount</StyledTableCell>
            <StyledTableCell align="right">Min Order Value</StyledTableCell>
            <StyledTableCell align="right">Expiry Date</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {coupons && coupons.length > 0 ? (
            coupons.map((item: any) => (
              <StyledTableRow key={item._id}>
                {/* Coupon Code */}
                <StyledTableCell component="th" scope="row">
                  <span className="font-semibold text-primary">
                    {item.code}
                  </span>
                </StyledTableCell>

                {/* Discount Value */}
                <StyledTableCell align="right">
                  {item.discountType === "percentage"
                    ? `${item.discountValue}%`
                    : `₹${item.discountValue}`}
                </StyledTableCell>

                {/* Minimum Order Value */}
                <StyledTableCell align="right">
                  ₹{item.minOrderValue}
                </StyledTableCell>

                {/* Expiry Date */}
                <StyledTableCell align="right">
                  {formatDate(item.expiryDate)}
                </StyledTableCell>

                {/* Active Status */}
                <StyledTableCell align="center">
                  <Chip
                    label={item.isActive ? "Active" : "Inactive"}
                    color={item.isActive ? "success" : "default"}
                    size="small"
                  />
                </StyledTableCell>

                {/* Delete Button */}
                <StyledTableCell align="right">
                  <IconButton
                    onClick={() => handleDeleteCoupon(item._id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={6} align="center">
                No Coupons Found
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}