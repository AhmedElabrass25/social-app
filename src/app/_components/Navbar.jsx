"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { SlSocialInstagram } from "react-icons/sl";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeToken, setToken } from "../_redux/authSlice";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [mobileNav, setMobileNav] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  useEffect(() => {
    const localToken = localStorage.getItem("socialToken");
    if (localToken && !auth?.token) {
      dispatch(setToken(localToken));
    }
  }, [auth?.token, dispatch]);
  return (
    <nav className="bg-white w-full border-gray-200 py-4 shadow-md sticky top-0 left-0 right-0 z-[99] mb-5">
      <div className="container">
        <div className="row flex justify-between items-center">
          {/* Logo */}
          <Link
            href={`${auth?.token ? "/" : "/login"}`}
            className="flex items-center space-x-3 text-blue-700"
          >
            <SlSocialInstagram className="text-3xl" />
            <span className="text-2xl font-semibold">Social</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileNav(!mobileNav)}
            type="button"
            className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-expanded={mobileNav}
          >
            {mobileNav ? (
              <AiOutlineClose className="text-2xl" />
            ) : (
              <AiOutlineMenu className="text-2xl" />
            )}
          </button>

          {/* Navigation Links */}
          <div
            className={`absolute md:static top-16 left-0 w-full md:w-auto md:flex md:items-center md:space-x-8 transition-all duration-300 ease-in-out ${
              mobileNav ? "block shadow-md" : "hidden md:block"
            }`}
          >
            <ul className="flex flex-col md:flex-row items-center md:space-x-6 bg-white md:bg-transparent">
              {auth?.token && (
                <>
                  <li>
                    <Link
                      onClick={() => setMobileNav(false)}
                      href={`/profile`}
                      className="block text-lg py-2 px-3 text-blue-500 hover:text-blue-700 md:border-0 font-medium transition-all duration-200 rounded-md md:mb-0 mb-3"
                    >
                      Profile
                    </Link>
                  </li>{" "}
                  <li>
                    <Link
                      onClick={() => setMobileNav(false)}
                      href={`/createPost`}
                      className="block text-lg py-2 px-3 text-blue-500 hover:text-blue-700 md:border-0 font-medium transition-all duration-200 rounded-md md:mb-0 mb-3"
                    >
                      Create_Post
                    </Link>
                  </li>
                </>
              )}
              {auth?.token ? (
                <li
                  onClick={() => {
                    localStorage.removeItem("socialToken");
                    dispatch(removeToken());
                    router.push("/login");
                    setMobileNav(false);
                  }}
                  className="block text-lg bg-blue-600 py-1 px-2 text-white hover:bg-blue-700 md:border-0 font-medium transition-all duration-200 rounded-md md:mb-0 mb-3 cursor-pointer"
                >
                  Logout
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      onClick={() => setMobileNav(false)}
                      href={`/login`}
                      className="block text-lg bg-blue-600 py-1 px-2 text-white hover:bg-blue-700 md:border-0 font-medium transition-all duration-200 rounded-md md:mb-0 mb-3"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => setMobileNav(false)}
                      href={`/register`}
                      className="block text-lg bg-blue-600 py-1 px-2 text-white hover:bg-blue-700 md:border-0 font-medium transition-all duration-200 rounded-md md:mb-0 mb-3"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
