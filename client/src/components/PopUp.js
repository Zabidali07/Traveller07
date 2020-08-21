import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useHistory, Link } from "react-router-dom";

const PopUp = ({ match }) => {
  const history = useHistory();
  const [user, setUser] = useState([]);

  const [email, setEmail] = useState(match.params.userToken);
  useEffect(() => {
    Axios.post("/get-user-details", {
      email,
    })
      .then((res) => {
        console.log("Success in Fetching user detail", email, res);
        setUser(res.data.result);
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
  let tempPath = String(user.profileImgPath);
  tempPath = "http://localhost:8000/uploads/" + tempPath.substr(15);

  return (
    <div className="container mt-5 custom-top">
      <div>
        <Link to="/user/dashboard" className="custom-close">
          close
        </Link>
        <div className="card">
          <div className="row">
            <div className="col-md-6">
              {" "}
              <img
                className="card-img-top img-fluid"
                src={user.profileImgPath}
              />
            </div>
            <div className="col-md-6">
              <h4
                className="card-title"
                onClick={() => console.log(`cliclk ${email}`)}
              >
                {user.name}
              </h4>
              <p className="card-text">{email}</p>
              <p>{tempPath}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
