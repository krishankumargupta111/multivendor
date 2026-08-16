import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";

import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  sendLoginSignupOtp,
  signin,
} from "../redux/features/Auth/AuthSlice";
import { useNavigate } from "react-router";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { auth } = useAppSelector((store) => store);

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },

    onSubmit: (values) => {
      dispatch(
        signin({
          ...values,
          navigate,
        })
      );

      console.log(values);
    },
  });

  const handleSendOtp = () => {
    const email = "signin_" + formik.values.email;

    dispatch(sendLoginSignupOtp({ email }));
  };

  return (
    <div>
      <h1
        className="text-2xl text-center font-bold text-teal-600
        pb-5"
      >
        Login
      </h1>

      <form
        className="space-y-5"
        onSubmit={formik.handleSubmit}
      >
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
            type={auth.otpSend ? "submit" : "button"}
            onClick={() => {
              if (!auth.otpSend) {
                handleSendOtp();
              }
            }}
            fullWidth
            sx={{ py: "12px" }}
            variant="contained"
          >
            {auth.otpSend ? "Login" : "Send OTP"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;