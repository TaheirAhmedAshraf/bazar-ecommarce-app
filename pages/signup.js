import React from "react";
import { TextField } from "../components/TextField";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { signup } from "../firebase/emailpassword";
import { signInWithGoogle } from "../firebase/google";
import { useRouter } from "next/router";

export default function SignupPage() {
  const router = useRouter()

  const validate = Yup.object({
    fullName: Yup.string()
      .max(25, "Must be 25 characters or less")
      .required("Required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match")
      .required("Confirm password is required"),
  });
  return (
    <div className="bg-gray-100 h-auto flex justify-center items-center">
      <div className="md:w-[35vw] bg-white p-10 text-dark text-center">
        <h1 className="text-xl font-medium mb-1">Create Your Account</h1>
        <p className="text-xs">Please fill all fields to continue</p>
        <div className="py-10">
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validate}
            onSubmit={(values) => {
              signup(values)
            }}
          >
            {(formik) => (
              <div>
                <Form>
                  <TextField label="Full Name" name="fullName" type="text" />
                  <TextField label="Email" name="email" type="email" />
                  <TextField label="Password" name="password" type="password" />
                  <TextField
                    label="Retype Password"
                    name="confirmPassword"
                    type="password"
                  />
                  <button
                    className="w-full bg-primary text-white font-medium rounded-md py-2 my-5"
                    type="submit"
                  >
                    Create Account
                  </button>
                </Form>
              </div>
            )}
          </Formik>
          <div>
            <hr className="mt-3 mb-6" />
            <div className="flex flex-col space-y-3">
              <button className="w-100 bg-blue-900 text-white font-medium text-sm py-3 px-3 rounded-md">
                Continue With Facebook
              </button>
              <button onClick={signInWithGoogle} className="w-100 bg-blue-500 text-white font-medium text-sm py-3 px-3 rounded-md">
                Continue With Google
              </button>
            </div>
          </div>
          <p className="py-3 text-dark">
            Dont have an account?{" "}
            <a href="#" className="underline font-semibold" onClick={() => router.push("/login")} >
              Login
            </a>
          </p>
          <p className="py-3 text-dark">
            Forgot your password?{" "}
            <a href="#" className="underline font-semibold">
              Reset It
            </a>
          </p>
        </div>
      </div>
    </div >
  );
}
