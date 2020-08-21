import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Layout from "./Layout";
import Uploadimage from "./Uploadimage";
import { useSelector } from "react-redux";

const UpdateProfile = () => {
  const history = useHistory();

  const [currentProfile, setCurrentprofile] = useState({
    name: "",
    profileImgPath: "",
    buttonText: "Save changes",
    id: "",
  });
  const uploadInfo = useSelector((state) => state);

  const imgPath = uploadInfo.imgPath;

  let email = localStorage.getItem("userEmailInLocalStorage");

  useEffect(() => {
    Axios.post("/get-user-details", {
      email,
    })
      .then((res) => {
        console.log("Success in Fetching user detail", res);

        setCurrentprofile({
          ...currentProfile,
          name: res.data.result.name,
          id: res.data.result._id,
        });
      })
      .catch((err) => {
        if (err) {
          console.log(
            "Error in fetching user details from the user",
            email,
            err
          );
        }
      });
  }, []);

  const { name, profileImgPath, buttonText, id } = currentProfile;
  const [newName, setnewName] = useState("");

  useEffect(() => {
    setnewName(name);
  }, []);
  const handleChange = (event) => {
    setnewName(event.target.value);
    setCurrentprofile({
      ...currentProfile,
      name: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    Axios.post("/update-fields-of-user", {
      id,
      newName,
      imgPath,
    })
      .then((res) => {
        console.log("Your fields updated successfully", res);
        localStorage.setItem("userNameInLocalStorage", newName);
        history.push("/user/dashboard");
      })
      .catch((err) => console.log("Error in updating fields", id, err));
  };

  return (
    <Layout>
      <div className="container">
        <h3>Your Profile</h3>
        <div>change your profile pic</div>
        <Uploadimage />
      </div>
      <form>
        <div className="form-group">
          <label>Update Username</label>
          <input type="text" value={name} name="name" onChange={handleChange} />
        </div>
        <div>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            {buttonText}
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default UpdateProfile;
