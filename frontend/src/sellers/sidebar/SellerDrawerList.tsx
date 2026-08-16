import {
  AccountBalanceWallet,
  AccountBox,
  Add,
  Inventory,
  Logout,
  Receipt,
  ShoppingBag,
} from "@mui/icons-material";
import {
  Divider,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { useAppDispatch } from "../../redux/store";
import { performLogout } from "../../redux/features/Auth/AuthSlice";

const menu = [
  {
    name: "Orders",
    path: "/seller/orders",
    icon: <ShoppingBag className="text-primary-color" />,
    activeIcon: <ShoppingBag className="text-white" />,
  },
  {
    name: "Products",
    path: "/seller/products",
    icon: <Inventory className="text-primary-color" />,
    activeIcon: <Inventory className="text-white" />,
  },
  {
    name: "Add Product",
    path: "/seller/add-product",
    icon: <Add className="text-primary-color" />,
    activeIcon: <Add className="text-white" />,
  },
  {
    name: "Payment",
    path: "/seller/payment",
    icon: (
      <AccountBalanceWallet className="text-primary-color" />
    ),
    activeIcon: (
      <AccountBalanceWallet className="text-white" />
    ),
  },
  {
    name: "Transaction",
    path: "/seller/transaction",
    icon: <Receipt className="text-primary-color" />,
    activeIcon: <Receipt className="text-white" />,
  },
];

const menu2 = [
  {
    name: "Account",
    path: "/seller/account",
    icon: <AccountBox className="text-primary-color" />,
    activeIcon: <AccountBox className="text-white" />,
  },
  {
    name: "Logout",
    path: "/",
    icon: <Logout className="text-primary-color" />,
    activeIcon: <Logout className="text-white" />,
  },
];

interface SellerDrawerListProps {
  toggleDrawer?: (newOpen: boolean) => () => void;
}

function SellerDrawerList({
  toggleDrawer,
}: SellerDrawerListProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(performLogout());
    console.log("logout");
  };

const handleClick = (item: {
  name: string;
  path: string;
}) => {
  if (item.name === "Logout") {
    handleLogout();
  }

  navigate(item.path);

  if (toggleDrawer) {
    toggleDrawer(false)();
  }
};

  return (
    <div className="h-full">
      <div
        className="flex flex-col justify-between h-full w-[300px]
        border-r py-5 border-gray-300"
      >
  

        <div className="space-y-2">
          {menu.map((item) => (
            <div
              onClick={() => handleClick(item)}
              key={item.path}
              className="pr-9 cursor-pointer"
            >
              <p
                className={`${
                  location.pathname === item.path
                    ? "bg-[teal] text-white"
                    : ""
                } flex items-center px-5 py-3 rounded-r-full`}
              >
                <ListItemIcon>
                  {location.pathname === item.path
                    ? item.activeIcon
                    : item.icon}
                </ListItemIcon>

                <ListItemText primary={item.name} />
              </p>
            </div>
          ))}
        </div>


        <div className="space-y-2">
          <Divider />

          {menu2.map((item) => (
            <div
              onClick={() => handleClick(item)}
              key={item.path}
              className="pr-9 cursor-pointer"
            >
              <p
                className={`${
                  location.pathname === item.path
                    ? "bg-[teal] text-white"
                    : ""
                } flex items-center px-5 py-3 rounded-r-full`}
              >
                <ListItemIcon>
                  {location.pathname === item.path
                    ? item.activeIcon
                    : item.icon}
                </ListItemIcon>

                <ListItemText primary={item.name} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SellerDrawerList;