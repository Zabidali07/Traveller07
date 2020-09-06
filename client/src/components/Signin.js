import React, { useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { authenticate, isAuth } from "../utils/helper";
import Layout from "./Layout";

const Signin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
    buttonText: "Login",
  });

  const { buttonText, email, password } = formInputs;

  let tempEmail = email;
  let nameOfUser = "";

  const handleChange = (evt) => {
    setFormInputs({
      ...formInputs,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = (evt) => {
    // Avoid page refresh
    evt.preventDefault();
    setFormInputs({ ...formInputs, buttonText: "Submitting..." });

    axios
      .post("/signin", {
        email,
        password,
      })
      .then((res) => {
        console.log("SIGNED UP SUCCESS!!", res);

        axios
          .post("/get-user-details", {
            email,
          })
          .then((res) => {
            nameOfUser = res.data.result.name;
            dispatch({
              type: "GET_NAME",
              useremail: tempEmail,
              name2: nameOfUser,
            });
            localStorage.setItem("userNameInLocalStorage", nameOfUser);
            localStorage.setItem("userEmailInLocalStorage", tempEmail);

            console.log("receving name sucess", nameOfUser, tempEmail);
          })
          .catch((err) => {
            console.log("error in receveing name", err);
          });

        authenticate(res, () => {
          setFormInputs({
            ...formInputs,
            name: "",
            email: "",
            password: "",
            buttonText: "Submitted",
          });

          // toast.success(`Hey ${response.data.user.name}, Welcome back!`);
          // isAuth() ? {history.push("/user/dashboard")
          //            dispatch{

          //            }} : history.push("/signin");

          if (isAuth()) {
            console.log(tempEmail);

            history.push("/user/dashboard");
          } else {
            history.push("/");
          }
        });
      })
      .catch((err) => {
        if (err && err.response && err.response.data) {
          toast.error(err.response.data.error);
        }

        setFormInputs({
          ...formInputs,
          buttonText: "Submit",
        });
      });
  };

  const signinForm = () => (
    <div>
      <form>
        <div className="form-group">
          <label style={{ color: "#FEBE10" }}>Email</label>
          <input
            onChange={handleChange}
            name="email"
            type="email"
            value={email}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label style={{ color: "#FEBE10" }}>Password</label>
          <input
            onChange={handleChange}
            name="password"
            type="password"
            value={password}
            className="form-control"
          />
        </div>

        <div>
          <button
            type="button"
            className="btn mb-4"
            onClick={handleSubmit}
            style={{ background: "#8ee4af", fontWeight: "400" }}
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <div>
        <Layout />
        <div className="row mt-5 ">
          <div className="col-md-4"></div>
          <div
            className="col-md-4"
            style={{
              background: "#282828",
              borderRadius: "10px",
            }}
          >
            <ToastContainer />
            <h1
              className="p-5 text-center"
              style={{ color: "#5cdb95", fontWeight: "bold" }}
            >
              Log in
            </h1>
            {signinForm()}

            <Link
              to="/traveller/password/forgot"
              className="btn btn-sm btn-outline-danger mb-2"
            >
              Forgot Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
