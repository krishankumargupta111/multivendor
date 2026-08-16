import {
  Avatar,
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  AccountCircle,
  AddShoppingCart,
  FavoriteBorder,
  Menu,
  Search,
  Storefront,
} from "@mui/icons-material";
import { useState } from "react";
import { mainCategory } from "../../data/category/MainCategory";
import CategorySheet from "./CategorySheet";
import { useNavigate } from "react-router";
import  { useAppSelector } from "../../redux/store";
function Navbar() {

  const {user}=useAppSelector(store=>store)
    const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));

  const [showSheet, setShowSheet] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("men");
  const navigate=useNavigate()
  return (
    <Box
      className="z-9999 sticky top-0 left-0 right-0 bg-white blur-bg
    bg-opacity-80"
    >
      <div
        className=" flex items-center justify-between px-5
      lg:px-20 h-[70px] border-b border-gray-200"
      >
        <div className="flex items-center gap-9">
          <div className="flex items-center gap-2">
            {!isLarge && (
              <IconButton>
                <Menu className="text-gray-700" sx={{ fontSize: 29 }} />
              </IconButton>
            )}

            <h1 onClick={()=>navigate("/")} className="logo cursor-pointer text-lg md:text-2xl">Bazar</h1>
          </div>
          <ul className=" flex items-center font-medium text-gray-800">
            {mainCategory.map((item) => (
              <li
                onMouseLeave={() => {
                  setShowSheet(false);
                }}
                onMouseEnter={() => {
                  setSelectedCategory(item.categoryId);
                  setShowSheet(true);
                }}
                key={item.categoryId}
                className="mainCategory hover:text-[#00927c] cursor-pointer
              hover:border-b-2 h-[70px] px-4 border-[#00927c] flex items-center
              "
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-5">
          <IconButton>
            <Search sx={{ fontSize: 29 }} />
          </IconButton>
          {user.user?.fullName ? (
            <Button onClick={()=>navigate('/account')} className="flex items-center gap-2">
              <Avatar
                src="https://img.magnific.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg"
                sx={{ width: 29, height: 29 }}
              />
              <h1>{user.user?.fullName}</h1>
            </Button>
          ) : (
            <Button onClick={()=>navigate("/login")} variant="contained" startIcon={<AccountCircle />}>
              Login
            </Button>
          )}
          <IconButton>
            <FavoriteBorder sx={{ fontSize: 29 }} />
          </IconButton>
          <IconButton onClick={()=>navigate("/cart")}>
            <AddShoppingCart sx={{ fontSize: 29 }} />
          </IconButton>
          <Button onClick={()=>navigate("/become-seller")} variant="outlined" startIcon={<Storefront />}>
            Become Seller
          </Button>
        </div>
      </div>
      {showSheet && (
        <div
          onMouseLeave={() => setShowSheet(false)}
          onMouseEnter={() => setShowSheet(true)}
          className="categorysheet absolute top-[4.4rem]
      left-20 right-20"
        >
          <CategorySheet
            selectedCategory={selectedCategory}
            setShowSheet={setShowSheet}
          />
        </div>
      )}
    </Box>
  );
}

export default Navbar;
