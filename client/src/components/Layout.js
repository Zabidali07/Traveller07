import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth, signout } from "../utils/helper";
import { useDispatch } from "react-redux";
import { DropdownButton, Dropdown } from "react-bootstrap";

const Layout = ({ children, match, history }) => {
  const dispatch = useDispatch();
  const isActive = (path) => {
    if (match.path === path) {
      return { color: "#555" };
    } else {
      return { color: "#fff" };
    }
  };

  const nav = () => (
    <ul className="nav nav-tabs custom-navbar-new">
      <li className="nav-item">
        <Link to="/" className="nav-link" style={isActive("/")}>
          Traveller
        </Link>
      </li>
      {!isAuth() && (
        <>
          <li className="nav-item">
            <Link to="/signup" className="nav-link" style={isActive("/signup")}>
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/signin" className="nav-link" style={isActive("/signin")}>
              Login
            </Link>
          </li>
        </>
      )}

      {isAuth() && (
        <>
          <li className="nav-item">
            <Link
              to="/user/dashboard"
              className="nav-link"
              style={isActive("/user/dashboard")}
            >
              Dashboard
            </Link>
          </li>

          <li className="nav-item">
            <span
              className="nav-link"
              style={{ cursor: "pointer", color: "#fff" }}
              onClick={() => {
                signout(() => {
                  history.push("/");
                  localStorage.clear();
                });
              }}
            >
              Signout
            </span>
          </li>
          <div className="navbar-right">
            <li className="nav-item ">
              <DropdownButton title="View Profile">
                <Dropdown.Item href="/user/posts">My Posts</Dropdown.Item>
                <Dropdown.Item href="/user/update-profile">
                  Profile
                </Dropdown.Item>
                <Dropdown.Item href="/add-new-article">
                  Add new Article
                </Dropdown.Item>
              </DropdownButton>
            </li>
          </div>
        </>
      )}
    </ul>
  );

  return (
    <Fragment>
      {nav()}
      <div className="container-fluid">{children}</div>
    </Fragment>
  );
};

export default withRouter(Layout);
