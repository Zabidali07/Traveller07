import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState([]);
  let email = localStorage.getItem("userEmailInLocalStorage");
  useEffect(() => {
    axios
      .post("/get-user-details", {
        email,
      })
      .then((res) => {
        console("Success in Fetching user detail");
        setUserDetails(res.data.result);
      })
      .catch((err) => {
        if (err) {
          console.log("Error in fetching user details from the user", err);
        }
      });
  }, []);
};
export default UserProfile;
