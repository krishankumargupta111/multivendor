import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, {
  tableCellClasses,
} from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect } from "react";
import { fetchTransactionBySeller } from "../../redux/features/seller/TransactionSlice";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

type Transaction = {
  _id?: string;
  date?: string;
  customer?: {
    fullName?: string;
    email?: string;
  };
  order?: {
    _id?: string;
    orderItems?: unknown[];
    totalSellingPrice?: number;
  };
};

export default function TransactionTable() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      dispatch(fetchTransactionBySeller(jwt));
    }
  }, [dispatch]);

  const { transaction } = useAppSelector(
    (store) => store.transaction
  );

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 700 }}
        aria-label="transaction table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>
              Date
            </StyledTableCell>

            <StyledTableCell align="right">
              Customer
            </StyledTableCell>

            <StyledTableCell align="right">
              Order
            </StyledTableCell>

            <StyledTableCell align="right">
              Amount
            </StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {(transaction as Transaction[]).map(
            (item, index) => (
              <StyledTableRow
                key={item._id || index}
              >
                {/* DATE */}
                <StyledTableCell
                  component="th"
                  scope="row"
                >
                  {item.date
                    ? new Date(
                        item.date
                      ).toLocaleDateString()
                    : "-"}
                </StyledTableCell>

                {/* CUSTOMER */}
                <StyledTableCell align="right">
                  {typeof item.customer === "object"
                    ? item.customer?.fullName ||
                      item.customer?.email ||
                      "-"
                    : item.customer || "-"}
                </StyledTableCell>

                {/* ORDER */}
                <StyledTableCell align="right">
                  {item.order?._id || "-"}
                </StyledTableCell>

                {/* AMOUNT */}
                <StyledTableCell align="right">
                  ₹{item.order?.totalSellingPrice || 0}
                </StyledTableCell>
              </StyledTableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}