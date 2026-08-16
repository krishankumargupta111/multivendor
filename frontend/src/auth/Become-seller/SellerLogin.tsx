import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { verifyLoginOtp } from "../../redux/features/seller/SellerAuthentication";
import {
  resetAuthState,
  sendLoginSignupOtp,
} from "../../redux/features/Auth/AuthSlice";
import { useNavigate } from "react-router";

function SellerLogin() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  const { auth } = useAppSelector((store) => store);

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },

    onSubmit: (values) => {
      console.log(values);

      dispatch(
        verifyLoginOtp({
          ...values,
          navigate,
        })
      );
    },
  });

  const handleSentOtp = () => {
    const email = "signin_" + formik.values.email;

    dispatch(sendLoginSignupOtp({ email }));
  };

  return (
    <div>
      <h1
        className="text-2xl text-center font-bold text-teal-600
        pb-5"
      >
        Seller Login
      </h1>

      <div className="space-y-5">
        {/* Email */}
        <div>
          <TextField
            fullWidth
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.email &&
              Boolean(formik.errors.email)
            }
            helperText={
              formik.touched.email &&
              formik.errors.email
            }
          />
        </div>

        {/* OTP */}
        {auth.otpSend && (
          <div>
            <TextField
              fullWidth
              name="otp"
              label="OTP"
              value={formik.values.otp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.otp &&
                Boolean(formik.errors.otp)
              }
              helperText={
                formik.touched.otp &&
                formik.errors.otp
              }
            />
          </div>
        )}

        {/* Button */}
        <div className="pb-6">
          <Button
            onClick={() => {
              if (auth.otpSend) {
                formik.handleSubmit();
              } else {
                handleSentOtp();
              }
            }}
            fullWidth
            sx={{ py: "12px" }}
            variant="contained"
          >
            {auth.otpSend ? "Login" : "Send OTP"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SellerLogin;