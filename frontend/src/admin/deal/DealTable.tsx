import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useEffect } from "react";
import {
  deleteDeal,
  getAllDeals,
} from "../../redux/features/admin/DealSlice";

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

export default function DealTable() {
  const dispatch = useAppDispatch();

  const deal = useAppSelector((store) => store.deal);

  useEffect(() => {
    dispatch(getAllDeals({}));
  }, [dispatch]);

  const handleDeleteDeal = (id: string) => {
    dispatch(deleteDeal(id));
  };

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 700 }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>

            <StyledTableCell align="right">
              Category
            </StyledTableCell>

            <StyledTableCell align="right">
              Discount
            </StyledTableCell>

            <StyledTableCell align="right">
              Edit
            </StyledTableCell>

            <StyledTableCell align="right">
              Delete
            </StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {deal.deals.map((item, index) => (
            <StyledTableRow key={item._id}>
              <StyledTableCell
                component="th"
                scope="row"
              >
                {index + 1}
              </StyledTableCell>

              <StyledTableCell align="right">
                {item.category?.name}
              </StyledTableCell>

              <StyledTableCell align="right">
                {item.discount}%
              </StyledTableCell>

              <StyledTableCell align="right">
                <IconButton>
                  <Edit color="primary" />
                </IconButton>
              </StyledTableCell>

              <StyledTableCell align="right">
                <IconButton
                  onClick={() => handleDeleteDeal(item._id)}
                >
                  <Delete color="error" />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}