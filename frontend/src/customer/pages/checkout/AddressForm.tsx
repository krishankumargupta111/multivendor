import { Box, Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch } from "../../../redux/store";
import { createAddress } from "../../../redux/features/customer/OrderSlice";

interface AddressFormProps {
  paymentGateway: string;
  onClose: () => void;
}

function AddressForm({

  onClose,
}: AddressFormProps) {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      locality: "",
    },

    onSubmit: async (values) => {
      await dispatch(
        createAddress({
          jwt: localStorage.getItem("jwt"),
          address: values,
        })
      );

      console.log("Address added successfully");
      onClose();
    },
  });

  return (
    <Box sx={{ maxWidth: 600, mx: "auto" }}>
      <p className="text-xl font-bold text-center pb-5">
        Contact Details
      </p>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name="mobile"
              label="Mobile"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.mobile &&
                Boolean(formik.errors.mobile)
              }
              helperText={
                formik.touched.mobile &&
                formik.errors.mobile
              }
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name="pincode"
              label="Pin Code"
              value={formik.values.pincode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.pincode &&
                Boolean(formik.errors.pincode)
              }
              helperText={
                formik.touched.pincode &&
                formik.errors.pincode
              }
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="address"
              label="Address (House No, Building, Street)"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.address &&
                Boolean(formik.errors.address)
              }
              helperText={
                formik.touched.address &&
                formik.errors.address
              }
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              name="locality"
              label="Locality/Town"
              value={formik.values.locality}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.locality &&
                Boolean(formik.errors.locality)
              }
              helperText={
                formik.touched.locality &&
                formik.errors.locality
              }
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name="city"
              label="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.city &&
                Boolean(formik.errors.city)
              }
              helperText={
                formik.touched.city &&
                formik.errors.city
              }
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              name="state"
              label="State"
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.state &&
                Boolean(formik.errors.state)
              }
              helperText={
                formik.touched.state &&
                formik.errors.state
              }
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              sx={{ py: "14px" }}
              type="submit"
              variant="contained"
            >
              Add Address
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default AddressForm;