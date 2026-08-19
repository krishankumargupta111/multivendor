import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../redux/store";
import {
  sendLoginSignupOtp,
  signup,
} from "../redux/features/Auth/AuthSlice";
import { useNavigate } from "react-router";

function SignupForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { auth } = useAppSelector((store) => store);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      otp: "",
    },

    onSubmit: (values) => {
      console.log(values);

      dispatch(
        signup({
          fullName: values.fullName,
          email: values.email,
          otp: values.otp,
          navigate,
        })
      );
    },
  });

  const handleSendOtp = () => {
    if (!formik.values.email) {
      alert("Please enter your email");
      return;
    }

    dispatch(
      sendLoginSignupOtp({
        email: formik.values.email,
      })
    );
  };

  const handleButtonClick = () => {
    if (auth.otpSend) {
      formik.submitForm();
    } else {
      handleSendOtp();
    }
  };

  return (
    <div>
      <h1 className="text-2xl text-center font-bold text-teal-600 pb-5">
        Create Account
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
        className="space-y-5"
      >
        <div>
        <TextField
          fullWidth
          name="fullName"
          label="Full Name"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        </div>

       <div>
        <TextField
          fullWidth
          name="email"
          label="Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={auth.otpSend}
        />
        </div>

        <div>
        {auth.otpSend && (
          <TextField
            fullWidth
            name="otp"
            label="Enter OTP"
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        )}</div>
    
<div className="pb-6">
        <Button 
          type="button"
          onClick={handleButtonClick}
          fullWidth
          sx={{ py: "12px" }}
          variant="contained"
        >
          {auth.otpSend ? "Sign Up" : "Send OTP"}
        </Button>
      </div>
      </form>
    </div>
  );
}

export default SignupForm;