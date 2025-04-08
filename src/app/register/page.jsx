"use client";
import axios from "axios";
import dayjs from "dayjs";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  // =========Handle Register=========
  const handleRegister = async (values) => {
    try {
      setLoading(true);
      // Format the date to "DD-MM-YYYY"
      const formattedValues = {
        ...values,
        dateOfBirth: dayjs(values.dateOfBirth).toISOString(),
      };

      const { data } = await axios.post(
        "https://linked-posts.routemisr.com/users/signup",
        formattedValues
      );
      toast.success("register is successed !");
      router.push("/login");
    } catch (error) {
      setError(error?.response?.data?.error);
      toast.error(error?.response?.data?.error || "something error !");
    } finally {
      setLoading(false);
    }
  };
  // =========Validation With Yup=========
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
    dateOfBirth: Yup.date().required("Date of birth is required"),
    gender: Yup.string().required("Gender is required"),
  });
  // =========useFormik to get data from the inputs=========
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    onSubmit: handleRegister,
    validationSchema: validationSchema,
  });
  // ===== If i have token redirect to home====
  useEffect(() => {
    if (localStorage.getItem("socialToken")) {
      router.push("/");
    }
  }, [router]);
  return (
    <section className="my-10">
      <div className="container h-full">
        <div className="row flex items-center justify-center h-full">
          <form
            onSubmit={formik.handleSubmit}
            action=""
            className="bg-blue-600 text-white px-6 py-8 rounded-lg w-full md:w-[600px]"
          >
            <h1 className="text-center text-2xl mb-5">Register Page</h1>
            <div className="content w-full flex items-center justify-center flex-col">
              {/* ==========Username======= */}
              <div className="mb-3 w-full md:w-[90%]">
                <p className="capitalize mb-1 text-md">username : </p>
                <input
                  type="text"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="w-full p-3 rounded-lg outline-none text-black"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.name}
                  </div>
                )}
              </div>
              {/* ========Email============= */}
              <div className="mb-3 w-full md:w-[90%]">
                <p className="capitalize mb-1 text-md">email : </p>
                <input
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="email"
                  className="w-full p-3 rounded-lg outline-none text-black"
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </div>
                )}
              </div>
              {/* ========Password============= */}
              <div className="mb-3 w-full md:w-[90%]">
                <p className="capitalize mb-1 text-md">password : </p>
                <input
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="password"
                  className="w-full p-3 rounded-lg outline-none text-black"
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </div>
                )}
              </div>
              {/* ========rePassword============= */}
              <div className="mb-3 w-full md:w-[90%]">
                <p className="capitalize mb-1 text-md">rePassword : </p>
                <input
                  name="rePassword"
                  value={formik.values.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="password"
                  className="w-full p-3 rounded-lg outline-none text-black"
                />
                {formik.touched.rePassword && formik.errors.rePassword && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.rePassword}
                  </div>
                )}
              </div>
              {/* ========date of birth============= */}
              <div className="mb-3 w-full md:w-[90%]">
                <p className="capitalize mb-1 text-md">Date of birth : </p>
                <input
                  name="dateOfBirth"
                  value={formik.values.dateOfBirth}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="date"
                  className="w-full p-2 rounded-lg outline-none text-black"
                />
                {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.dateOfBirth}
                  </div>
                )}
              </div>
              {/* ========date of birth============= */}
              <div className="mb-3 w-full md:w-[90%]">
                <p className="capitalize mb-1 text-md">gender : </p>
                <select
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 outline-none"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
                {formik.touched.gender && formik.errors.gender && (
                  <div className="text-red-500 text-sm mt-1">
                    {formik.errors.gender}
                  </div>
                )}
              </div>
              {/* ========register button============= */}
              <div className="mb-3 w-full md:w-[90%] flex items-center justify-center mt-5">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-neutral-100 text-blue-900 px-6 py-2 text-xl rounded-lg font-semibold shadow-lg hover:px-7 hover:py-3 transition-all duration-200 flex items-center justify-center"
                >
                  {loading ? (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
              {/* If you have an account */}
              <p className="text-xl mb-2 group ">
                Have an account ?{" "}
                <Link
                  href={"/login"}
                  className="text-gray-200 group-hover:font-bold"
                >
                  Login
                </Link>
              </p>
              {/* ====== The Error Message */}
              {error && (
                <div className="text-red-200 bg-red-900 text-[18px] mt-1 px-4 py-2 rounded-lg capitalize">
                  {error}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
