import { useEffect, useState, type MouseEvent } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Chip, Menu, MenuItem } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  fetchSellerOrders,
  updateOrderStatus,
} from "../../redux/features/seller/SellerOrderSlice";

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

const orderStatus = [
  { color: "#FFA500", label: "PENDING" },
  { color: "#F5BCBA", label: "PLACED" },
  { color: "#F5BCBA", label: "CONFIRMED" },
  { color: "#1E90FF", label: "SHIPPED" },
  { color: "#32CD32", label: "DELIVERD" },
  { color: "#FF0000", label: "CANCELLED" },
];

function OrderTable() {
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");

  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);

  const { orders } = useAppSelector(
    (store) => store.sellerOrder
  );

  const dispatch = useAppDispatch();

  const open = Boolean(anchorEl);

  const handleClick = (
    event: MouseEvent<HTMLButtonElement>,
    orderId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateOrder = (
    id: string,
    status: string
  ) => {
    dispatch(
      updateOrderStatus({
        orderId: id,
        orderStatus: status,
        jwt: localStorage.getItem("jwt"),
      })
    );

    handleClose();
  };

  useEffect(() => {
    dispatch(
      fetchSellerOrders(localStorage.getItem("jwt"))
    );
  }, [dispatch]);

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 700 }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>
              Order Id
            </StyledTableCell>

            <StyledTableCell>
              Products
            </StyledTableCell>

            <StyledTableCell align="right">
              Shipping Address
            </StyledTableCell>

            <StyledTableCell align="right">
              Order Status
            </StyledTableCell>

            <StyledTableCell align="right">
              Update Button
            </StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map((order) => (
            <StyledTableRow key={order._id}>
              <StyledTableCell
                component="th"
                scope="row"
              >
                {order._id}
              </StyledTableCell>

              <StyledTableCell>
                <div className="flex gap-1 flex-wrap">
                  {order.orderItems.map(
                    (item, index) => {
                      // Product may be undefined according to TypeScript
                      if (!item.product) {
                        return (
                          <div
                            key={`product-${index}`}
                            className="text-gray-500"
                          >
                            Product not available
                          </div>
                        );
                      }

                      return (
                        <div
                          key={`${item.product._id ?? index}`}
                          className="flex gap-5"
                        >
                          <img
                            className="w-20 rounded-md"
                            src={
                              item.product.images?.[0] || ""
                            }
                            alt={
                              item.product.title || "Product"
                            }
                          />

                          <div className="flex flex-col justify-between py-2">
                            <h1>
                              Title:{" "}
                              {item.product.title}
                            </h1>

                            <h1>
                              Price: Rs.{" "}
                              {item.sellingPrice}
                            </h1>

                            <h1>
                              Color:{" "}
                              {item.product.color}
                            </h1>

                            <h1>
                              Size: {item.size}
                            </h1>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              </StyledTableCell>

              <StyledTableCell align="right">
                <p>
                  {order.shippingAddress?.address},{" "}
                  {order.shippingAddress?.locality},{" "}
                  {order.shippingAddress?.city},{" "}
                  {order.shippingAddress?.state},{" "}
                  {order.shippingAddress?.pincode}
                </p>
              </StyledTableCell>

              <StyledTableCell align="right">
                <Chip label={order.orderStatus} />
              </StyledTableCell>

              <StyledTableCell align="right">
                <Button
                  onClick={(e) =>
                    handleClick(e, order._id)
                  }
                  color="primary"
                  size="small"
                >
                  Status
                </Button>

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  slotProps={{
                    list: {
                      "aria-labelledby":
                        "basic-button",
                    },
                  }}
                >
                  {orderStatus.map((status) => (
                    <MenuItem
                      key={status.label}
                      onClick={() =>
                        handleUpdateOrder(
                          selectedOrderId,
                          status.label
                        )
                      }
                    >
                      {status.label}
                    </MenuItem>
                  ))}
                </Menu>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OrderTable;