import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";

import { useAppDispatch, useAppSelector } from "../redux/store";
import { useNavigate } from "react-router";
import { sendLoginSignupOtp, signup } from "../redux/features/Auth/AuthSlice";

function SignupForm() {
  const {auth}=useAppSelector(store=>store)
  const dispatch=useAppDispatch()
  const navigate=useNavigate()
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      fullName:""
    },
    onSubmit: (values) => {
      console.log(values);
      dispatch(signup({...values,navigate}))
    },
  });
  const handleSendOtp=()=>{
    dispatch(sendLoginSignupOtp({email:formik.values.email}))
  }
  return (
    <div>
      <h1
        className="text-2xl text-center font-bold text-teal-600
      pb-5 "
      >
        Signup
      </h1>
      <form  className="space-y-5">

<div>
          <TextField
            fullWidth
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </div>
     { auth.otpSend && <div>
          <TextField
            fullWidth
            name="otp"
            label="otp"
            value={formik.values.otp}
            onChange={formik.handleChange}
            error={formik.touched.otp && Boolean(formik.errors.otp)}
            helperText={formik.touched.otp && formik.errors.otp}
          />
        </div>}

         {auth.otpSend &&<div>
          <TextField
            fullWidth
            name="fullName"
            label="Full Name"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
        </div>}
        <div className="pb-6">
          <Button onClick={auth.otpSend?formik.handleSubmit:handleSendOtp}
           fullWidth sx={{py:"12px"}}  variant="contained">Create Account</Button>
        </div>

      </form>
    </div>
  );
}

export default SignupForm;
