import {
  AddPhotoAlternate,
  Close,
} from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";

import { colors } from "../../data/filters/color";
import { mainCategory } from "../../data/category/MainCategory";
import { menLevelTwo } from "../../data/category/levelTwo/menLevelTwo";
import { womenLevelTwo } from "../../data/category/levelTwo/womenLevelTwo";
import { furnitureLevelTwo } from "../../data/category/levelTwo/furnitureLevelTwo";
import { electronicsLevelTwo } from "../../data/category/levelTwo/electronicLevelTwo";

import { menLevelThree } from "../../data/category/levelThree/menLevelThree";
import { womenLevelThree } from "../../data/category/levelThree/womenThree";
import { furnitureLevelThree } from "../../data/category/levelThree/furnitureLevelThree";
import { electronicsLevelThree } from "../../data/category/levelThree/electronicLevelThree";

import { uploadToCloudinary } from "../../util/uploadToCloudinary";
import { useAppDispatch } from "../../redux/store";
import { createProduct } from "../../redux/features/seller/SellerProductSlice";

const sizes = [
  "FREE",
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "3XL",
  "4XL",
  "5XL",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

type CategoryKey =
  | "men"
  | "women"
  | "kids"
  | "home_furniture"
  | "beauty"
  | "electronics";

type CategoryItem = {
  name: string;
  categoryId: string;
  parentCategoryId?: string;
  level?: number;
};

const categoryTwo: Record<CategoryKey, CategoryItem[]> = {
  men: menLevelTwo,
  women: womenLevelTwo,
  kids: [],
  home_furniture: furnitureLevelTwo,
  beauty: [],
  electronics: electronicsLevelTwo,
};

const categoryThree: Record<CategoryKey, CategoryItem[]> = {
  men: menLevelThree,
  women: womenLevelThree,
  kids: [],
  home_furniture: furnitureLevelThree,
  beauty: [],
  electronics: electronicsLevelThree,
};

type ProductFormValues = {
  title: string;
  mrpPrice: string;
  sellingPrice: string;
  quantity: number;
  description: string;
  color: string;
  images: string[];
  category: string;
  category2: string;
  category3: string;
  sizes: string;
};

function AddProducts() {
  const dispatch = useAppDispatch();

  const [uploadImage, setUploadImage] = useState(false);

  const formik = useFormik<ProductFormValues>({
    initialValues: {
      title: "",
      mrpPrice: "",
      sellingPrice: "",
      quantity: 100,
      description: "",
      color: "",
      images: [],
      category: "",
      category2: "",
      category3: "",
      sizes: "",
    },

    onSubmit: (values) => {
      const jwt = localStorage.getItem("jwt");

      dispatch(
        createProduct({
          jwt,
          request: values,
        })
      );

      console.log(values);
    },
  });

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setUploadImage(true);

      const image = await uploadToCloudinary(file);

      formik.setFieldValue("images", [
        ...formik.values.images,
        image,
      ]);
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setUploadImage(false);
    }

    // Allow selecting the same image again
    event.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = formik.values.images.filter(
      (_, i) => i !== index
    );

    formik.setFieldValue("images", updatedImages);
  };

  const childCategory = (
    category: CategoryItem[],
    parentCategoryId: string
  ) => {
    return category.filter(
      (child) => child.parentCategoryId === parentCategoryId
    );
  };

  const selectedCategory =
    formik.values.category as CategoryKey;

  const secondCategories =
    selectedCategory && categoryTwo[selectedCategory]
      ? categoryTwo[selectedCategory]
      : [];

  const thirdCategories =
    selectedCategory && categoryThree[selectedCategory]
      ? childCategory(
          categoryThree[selectedCategory],
          formik.values.category2
        )
      : [];

  return (
    <div>
      <h1 className="text-xl font-bold text-center py-5">
        Add PRODUCTS
      </h1>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>

          {/* ================= IMAGE ================= */}

          <Grid
            className="flex flex-wrap gap-5"
            size={{ xs: 12 }}
          >
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />

            <label htmlFor="fileInput" className="relative">
              <span
                className="w-24 h-24 cursor-pointer flex items-center
                justify-center p-3 border rounded-md border-gray-400"
              >
                <AddPhotoAlternate className="text-gray-700" />
              </span>

              {uploadImage && (
                <div
                  className="absolute left-0 right-0 top-0 bottom-0
                  w-24 h-24 flex justify-center items-center"
                >
                  <CircularProgress />
                </div>
              )}
            </label>

            <div className="flex flex-wrap gap-2">
              {formik.values.images.map((item, index) => (
                <div
                  className="relative"
                  key={index}
                >
                  <img
                    src={item}
                    alt=""
                    className="w-24 h-24 object-cover"
                  />

                  <IconButton
                    type="button"
                    onClick={() =>
                      handleRemoveImage(index)
                    }
                    size="small"
                    color="error"
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      outline: "none",
                    }}
                  >
                    <Close sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </div>
              ))}
            </div>
          </Grid>

          {/* ================= TITLE ================= */}

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              id="title"
              label="Title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              required
            />
          </Grid>

          {/* ================= DESCRIPTION ================= */}

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              id="description"
              label="Description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              required
              multiline
              rows={3}
            />
          </Grid>

          {/* ================= MRP ================= */}

          <Grid
            size={{
              xs: 12,
              sm: 6,
              lg: 3,
            }}
          >
            <TextField
              fullWidth
              id="mrpPrice"
              label="MRP Price"
              name="mrpPrice"
              type="number"
              value={formik.values.mrpPrice}
              onChange={formik.handleChange}
              required
            />
          </Grid>

          {/* ================= SELLING PRICE ================= */}

          <Grid
            size={{
              xs: 12,
              sm: 6,
              lg: 3,
            }}
          >
            <TextField
              fullWidth
              id="sellingPrice"
              label="Selling Price"
              name="sellingPrice"
              type="number"
              value={formik.values.sellingPrice}
              onChange={formik.handleChange}
              required
            />
          </Grid>

          {/* ================= COLOR ================= */}

          <Grid
            size={{
              xs: 12,
              sm: 6,
              lg: 3,
            }}
          >
            <FormControl fullWidth required>
              <InputLabel id="color-label">
                Color
              </InputLabel>

              <Select
                id="color"
                labelId="color-label"
                name="color"
                value={formik.values.color}
                onChange={formik.handleChange}
                label="Color"
              >
                {colors.map((item, index) => (
                  <MenuItem
                    key={index}
                    value={item.name}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* ================= SIZE ================= */}

          <Grid
            size={{
              xs: 12,
              sm: 6,
              lg: 3,
            }}
          >
            <FormControl fullWidth required>
              <InputLabel id="size-label">
                Size
              </InputLabel>

              <Select
                id="sizes"
                labelId="size-label"
                name="sizes"
                value={formik.values.sizes}
                onChange={formik.handleChange}
                label="Size"
              >
                {sizes.map((item, index) => (
                  <MenuItem
                    key={index}
                    value={item}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* ================= MAIN CATEGORY ================= */}

          <Grid
            size={{
              xs: 12,
              sm: 6,
              lg: 4,
            }}
          >
            <FormControl fullWidth required>
              <InputLabel id="category-label">
                Category
              </InputLabel>

              <Select
                id="category"
                labelId="category-label"
                name="category"
                value={formik.values.category}
                onChange={(event) => {
                  formik.handleChange(event);

                  // Reset child categories
                  formik.setFieldValue(
                    "category2",
                    ""
                  );
                  formik.setFieldValue(
                    "category3",
                    ""
                  );
                }}
                label="Category"
              >
                {mainCategory.map((item, index) => (
                  <MenuItem
                    key={index}
                    value={item.categoryId}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* ================= SECOND CATEGORY ================= */}

          <Grid
            size={{
              xs: 12,
              sm: 6,
              lg: 4,
            }}
          >
            <FormControl fullWidth required>
              <InputLabel id="category2-label">
                Second Category
              </InputLabel>

              <Select
                id="category2"
                labelId="category2-label"
                name="category2"
                value={formik.values.category2}
                onChange={(event) => {
                  formik.handleChange(event);

                  formik.setFieldValue(
                    "category3",
                    ""
                  );
                }}
                label="Second Category"
                disabled={!formik.values.category}
              >
                {secondCategories.map(
                  (
                    item: CategoryItem,
                    index: number
                  ) => (
                    <MenuItem
                      key={index}
                      value={item.categoryId}
                    >
                      {item.name}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>

          {/* ================= THIRD CATEGORY ================= */}

          <Grid
            size={{
              xs: 12,
              sm: 6,
              lg: 4,
            }}
          >
            <FormControl fullWidth required>
              <InputLabel id="category3-label">
                Third Category
              </InputLabel>

              <Select
                id="category3"
                labelId="category3-label"
                name="category3"
                value={formik.values.category3}
                onChange={formik.handleChange}
                label="Third Category"
                disabled={!formik.values.category2}
              >
                {thirdCategories.map(
                  (
                    item: CategoryItem,
                    index: number
                  ) => (
                    <MenuItem
                      key={index}
                      value={item.categoryId}
                    >
                      {item.name}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid>

          {/* ================= SUBMIT ================= */}

          <Grid size={{ xs: 12 }}>
            <Button
              sx={{ p: "14px" }}
              fullWidth
              type="submit"
              variant="contained"
            >
              Add Product
            </Button>
          </Grid>

        </Grid>
      </form>
    </div>
  );
}

export default AddProducts;