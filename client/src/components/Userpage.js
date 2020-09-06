import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import { Link } from "react-router-dom";

const Userpage = () => {
  const [listPosts, setPosts] = useState([]);
  const [display, setDisplay] = useState(false);
  const [inpopup, setinpopup] = useState("");
  const [user, setUser] = useState([]);
  const [popUpdetails, setpopUpdetails] = useState({
    path: "",
    name: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get("/all-posts")
      .then((res) => {
        console.log("fetching posts from server SUCCESS", res);

        setPosts(res.data.result);
        console.log(listPosts);
      })
      .catch((err) => {
        console.log("Error in fetching from database", err);
      });
  }, []);

  const myFunction = (email) => () => {
    console.log("calling my func ==>" + email);

    axios
      .post("/get-user-details", {
        email,
      })
      .then((res) => {
        console.log("Success in Fetching user detail", email, res);
        let tempPath = String(res.data.result.profileImgPath);
        tempPath = "http://localhost:8000/uploads/" + tempPath.substr(15);
        // tempPath = tempPath.substr(15);
        setpopUpdetails({
          ...popUpdetails,
          name: res.data.result.name,
          path: String(res.data.result.profileImgPath),
          email: res.data.result.email,
        });
        // setUser(res.data.result);
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

    setinpopup(email);
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  };

  const closePopup = () => {
    console.log("calling closePopup");
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  };
  return (
    <Layout>
      <div style={{ background: "#0b0c10" }}>
        <div id="myModal" className="modal w-50">
          <div className="container mt-5 custom-top">
            <div>
              <div className="card">
                <div className="row">
                  <div className="col-md-6">
                    {" "}
                    <img
                      className="card-img-top img-fluid"
                      src={popUpdetails.path}
                    />
                  </div>
                  <div className="col-md-6">
                    <span className="close" onClick={closePopup}>
                      &times;
                    </span>
                    <h4
                      className="card-title"
                      onClick={() =>
                        console.log(`cliclk ${popUpdetails.email}`)
                      }
                    >
                      {popUpdetails.name}
                    </h4>
                    <p className="card-text">
                      {" "}
                      <span>
                        <img src="../mail3.png" />
                      </span>{" "}
                      : {popUpdetails.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <h1>Blog Posts</h1>
          <div className="nav">
            {" "}
            <li>
              <Link to="/add-new-article" className="navbar-left">
                Add New Article
              </Link>{" "}
            </li>
          </div>
          <div>
            {listPosts.map((post, index) => {
              const fullpagePath = "/user/dashboard/" + post._id;
              return (
                <div
                  className="card mt-4 "
                  key={post._id}
                  style={{ background: "#66fcf1" }}
                >
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img
                        src={post.imagePath}
                        className="card-img img-fluid"
                        alt={String(post.imagePath).substr(15)}
                      />
                    </div>
                    <div className="col-md-8">
                      <div
                        className="card-title text-center"
                        style={{
                          fontWeight: "bold",
                          fontSize: "20px",
                          letterSpacing: "2px",
                        }}
                      >
                        {" "}
                        {post.title}
                      </div>
                      <div className="card-body">
                        {" "}
                        {post.description}
                        <p>{post.markdown}</p>
                        {post.cusineImagesPath.map((eachfood, index) => (
                          <img
                            key={index}
                            src={eachfood}
                            className="col-md-4"
                          />
                        ))}{" "}
                        <div>
                          {" "}
                          <Link to={fullpagePath}>Read more</Link>{" "}
                        </div>
                      </div>
                      <div className="float-right">
                        <br />
                        posted by:
                        <button
                          className="btn btn-primary"
                          onClick={myFunction(post.postedByEmail)}
                        >
                          {" "}
                          {post.author}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Userpage;
