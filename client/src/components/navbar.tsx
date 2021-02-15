import Link from "next/link";
import RedditLogo from "../images/reddit.svg";
import { useAuthDispatch, useAuthState } from "../context/auth";
import React, { Fragment } from "react";
import Axios from "axios";

const Navbar: React.FC = () => {
  const { authenticated , loading} = useAuthState();
  const dispatch = useAuthDispatch();

  const logout = async () => {
    try {
      await Axios.get("/auth/logout");
      dispatch("LOGOUT");
      //reload page instead of changing it in state
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 px-5 bg-white full-width">
      {/* Logo title */}
      <div className="flex items-center">
        <Link href="/">
          <a>
            <RedditLogo className="w-12 h-12 mr-2" />
          </a>
        </Link>
        <span className="text-2xl font-semibold">
          <Link href="/">
            <a>reddit</a>
          </Link>
        </span>
      </div>
      {/* Search Bar*/}
      <div className="flex items-center mx-auto bg-gray-100 border rounded hover:border-blue-500 hover:bg-white">
        <i className="pl-4 pr-3 text-gray-500 fa fa-search"></i>
        <input
          type="text"
          className="py-1 pr-3 bg-transparent rounded w-160 focus:outline-none"
          placeholder="Search..."
        ></input>
      </div>
      {/* Auth Btns*/}
      <div className="flex">
        {!loading && (authenticated ? (
          <a
            className="w-32 py-1 mr-4 leading-5 hollow blue button"
            onClick={logout}
          >
            Logout
          </a>
        ) : (
          <Fragment>
            <Link href="/login">
              <a className="w-32 py-1 mr-4 leading-5 hollow blue button">
                Login
              </a>
            </Link>
            <Link href="/register">
              <a className="w-32 py-1 leading-5 blue button">Signup</a>
            </Link>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
