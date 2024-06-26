import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context, serverURL } from "../main";
import axios from "axios";
import toast from "react-hot-toast";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const logoutHandler = async () => {
    setLoading(true);
    try {
      await axios.get(`${serverURL}/users/logout`, {
        withCredentials: true,
      });
      setIsAuthenticated(false);
      toast.success("You have successfully logged out");
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="header">
        <div className="">
          <h2>TODO App</h2>
        </div>
        <article>
          <Link to={"/"}>Home</Link>
          <Link to={"/profile"}>Profile</Link>

          {isAuthenticated ? (
            <button disabled={loading} className="btn" onClick={logoutHandler}>
              Logout
            </button>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </article>
      </nav>
    </>
  );
};

export default Header;
