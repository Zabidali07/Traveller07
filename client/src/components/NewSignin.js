import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate, isAuth } from "../utils/helper";
import Layout from "./Layout";
import styles from "../css/login.css";

const NewSignin = ({ show }) => {
  console.log(show);
  const [showSignup, setShowSignup] = useState(show);

  const SignUpForm = () => {
    let color = "";
    const [formInputs, setFormInputs] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      buttonText: "SignUp",
      borderPasswordColor: "",
    });

    const { buttonText, name, email, password, confirmPassword } = formInputs;

    const handleChange = (evt) => {
      if (password === confirmPassword) {
        color = "red";
      } else {
        color = "";
      }
      setFormInputs({
        ...formInputs,
        [evt.target.name]: evt.target.value,
        borderPasswordColor: color,
      });
    };

    const handleSubmit = (evt) => {
      // Avoid page refresh
      evt.preventDefault();
      if (password !== confirmPassword) {
        var modal = document.getElementById("myModal");
        modal.classList.remove("display-none");
      } else {
        axios
          .post("/signup", {
            name,
            email,
            password,
          })
          .then((res) => {
            console.log("SIGNED UP SUCCESS!!", res);

            setFormInputs({
              name: "",
              password: "",
              email: "",
              confirmPassword: "",
              buttonText: "Submit",
            });

            toast.success(res.data.message);
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
      }

      // setFormInputs({ ...formInputs, buttonText: "Submitting..." });
    };

    return (
      <div className="login-content">
        <form className="login-form">
          <img src="../signup.svg" />
          <h3 className="title">Be a Traveller</h3>
          <div className="login-input-div one">
            <div className="i">
              <i className="fas fa-user"></i>
            </div>
            <div className="div">
              <input
                type="text"
                className="login-input"
                onChange={handleChange}
                name="name"
                placeholder="Name"
                value={name}
              />
            </div>
          </div>
          <div className="login-input-div one">
            <div className="i">
              <i className="fas fa-user"></i>
            </div>
            <div className="div">
              <input
                onChange={handleChange}
                name="email"
                type="email"
                value={email}
                className="login-input"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="login-input-div one">
            <div className="i">
              <i className="fas fa-user"></i>
            </div>
            <div className="div">
              <input
                onChange={handleChange}
                name="password"
                type="password"
                value={password}
                className="login-input"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="login-input-div pass">
            <div className="i">
              <i className="fas fa-lock"></i>
            </div>
            <div className="div">
              <input
                onChange={handleChange}
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                className="login-input"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <button
            type="button"
            className="login-btn"
            style={{ display: "inline" }}
            value="Signup"
            onClick={handleSubmit}
          >
            {" "}
            {buttonText}
          </button>
          <a
            className="login-a"
            style={{
              float: "right",
              marginTop: "30px",
              fontWeight: "bold",
              fontSize: "18px",
              color: "#2CEC66",
            }}
            onClick={handleTogglePop}
          >
            Already a Traveller
          </a>
        </form>
      </div>
    );
  };

  const SignInform = () => {
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
    return (
      <div className="login-content">
        <form className="login-form">
          <img src="../login.svg" />
          <h3 className="title">Get In Traveller</h3>
          <div className="login-input-div one">
            <div className="i">
              <i className="fas fa-user"></i>
            </div>
            <div className="div">
              <input
                onChange={handleChange}
                name="email"
                type="email"
                value={email}
                placeholder="Email"
                className="login-input"
              />
            </div>
          </div>
          <div className="login-input-div pass">
            <div className="i">
              <i className="fas fa-lock"></i>
            </div>
            <div className="div">
              <input
                onChange={handleChange}
                name="password"
                type="password"
                value={password}
                placeholder="Password"
                className="login-input"
              />
            </div>
          </div>
          <a href="/traveller/password/forgot" className="login-a">
            Forgot Password?
          </a>{" "}
          <button
            type="button"
            className="login-btn"
            style={{ display: "inline" }}
            onClick={handleSubmit}
          >
            {" "}
            {buttonText}{" "}
          </button>
          <button
            className="login-btn"
            style={{ float: "right" }}
            onClick={handleTogglePop}
          >
            Sign up
          </button>
        </form>
      </div>
    );
  };

  const handleTogglePop = (event) => {
    event.preventDefault();
    setShowSignup(!showSignup);
  };

  const inputs = document.querySelectorAll(".input");

  function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
  }

  function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value == "") {
      parent.classList.remove("focus");
    }
  }

  inputs.forEach((input) => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
  });

  return (
    <div>
      <Layout />
      <img className="login-wave" src="../wave.png" />
      <div className="login-container">
        <div className="login-img">
          <img src="../boy-d.svg" />
        </div>

        {showSignup ? <SignUpForm /> : <SignInform />}
      </div>
    </div>
  );
};

export default NewSignin;
