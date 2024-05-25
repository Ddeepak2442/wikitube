import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";

import AuthContext from "../../../context/AuthContext";

const Header = () => {
  const { loading, user, logout } = useContext(AuthContext);

  const logoutHandler = () => {
    logout();
  };

  return (
    <div className="navWrapper">
      <div className="navContainer">
        <Link href="/">
          <div className="logoWrapper">
            {/* <div className="logoImgWrapper">
              <Image width="50" height="50" src="/images/logo.png" alt="" />
            </div> */}
            <span className="logo1">Wikitube</span>
          </div>
        </Link>
        <div className="btnsWrapper">
          {user ? (
            <div className="dropdown ml-3">
              <p
                className="btn dropdown-toggle mr-4"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span>Hi, {user.first_name}</span>{" "}
              </p>

              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                <Link href="/me">
                  <p className="dropdown-item">Profile</p>
                </Link>                
                <Link href="/">
                  <p
                    className="dropdown-item text-danger"
                    onClick={logoutHandler}
                  >
                    Logout
                  </p>
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link href="/login">
                <button className="loginButtonHeader">
                  <span>Login</span>
                </button>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
