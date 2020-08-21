import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Layout from "./Layout";

const Signup = () => {
  let color = "";
  const [formInputs, setFormInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    buttonText: "Submit",
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

    setFormInputs({ ...formInputs, buttonText: "Submitting..." });
  };

  const closePopup = () => {
    console.log("calling closePopup");
    var modal = document.getElementById("myModal");
    modal.classList.add("display-none");
  };

  const signupForm = () => (
    <div>
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            onChange={handleChange}
            name="name"
            value={name}
            type="text"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            onChange={handleChange}
            name="email"
            type="email"
            value={email}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            onChange={handleChange}
            name="password"
            type="password"
            value={password}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label className="text-muted">Confirm Password</label>
          <input
            onChange={handleChange}
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            className="form-control"
          />
        </div>

        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <Layout>
      <div id="myModal" className="mt-4 display-none float-right">
        <div
          className="col"
          style={{
            backgroundColor: "#c1c8e4",
            color: "#886080",
            fontWeight: "300",
            fontSize: "18px",
          }}
        >
          {" "}
          Password Mismatch with Confirm Password
          <span
            className="close float-right"
            onClick={closePopup}
            style={{ display: "inline-block", marginLeft: "10px" }}
          >
            &times;
          </span>
        </div>
      </div>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        <h1 className="p-5 text-center">Sign up</h1>

        {signupForm()}
      </div>
    </Layout>
  );
};

export default Signup;
