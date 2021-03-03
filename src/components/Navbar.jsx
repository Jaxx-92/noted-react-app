import React, { lazy } from "react";
import { Container, Navbar } from "react-bootstrap";
import ProfileIcon from "../assets/icons/Profile.svg";
import DropwDownIcon from "../assets/icons/InvertedTriangle.svg";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { get } from "lodash";

const BrandLogoSvg = lazy(() => import("./BrandLogoSvg"));

const pageLocation = global.location.pathname;

const guestViews = [
  "/",
  "/login",
  "/join",
  "/forgot-password",
  "/reset-password",
  "/request-permission/",
  "/request-permission",
];

const Topnav = () => {
  const {
    location: { pathname },
  } = useHistory();
  const user = useSelector(({ auth: { user } }) => user);
  const showShadow = [
    "/",
    "/join",
    "/login",
    "/forgot-password",
    "/reset-password",
    "/request-permission/",
    "/request-permission",
  ].includes(pathname)
    ? ""
    : "shadow-sm";
  return (
    <Navbar
      expand={`lg ${showShadow}`}
      style={{
        border: "none",
        backgroundColor: [
          "/",
          "/join",
          "/login",
          "/forgot-password",
          "/reset-password",
          "/request-permission/",
          "/request-permission",
        ].includes(pathname)
          ? "#FAF8FA"
          : "",
      }}
    >
      <Navbar.Brand
        href={`${guestViews.indexOf(pageLocation) != -1 ? "/" : "/dashboard"}`}
        className="ml-4 mr-1"
      >
        <BrandLogoSvg />
      </Navbar.Brand>
      {pathname === "/dashboard" && (
        <>
          <Container className="ml-3">
            <input
              type="name"
              className="form-control search"
              aria-describedby="name"
              placeholder="Search purchases"
            />
          </Container>
          <div className="mr-5">
            <div className="btn p-0">
              <img src={ProfileIcon} />
            </div>
            <div className="btn p-0">
              <img src={DropwDownIcon} />
            </div>
          </div>
        </>
      )}
    </Navbar>
  );
};

export default Topnav;
