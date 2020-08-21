import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import { Link } from "react-router-dom";

const Home = () => {
  const [listPosts, setPosts] = useState([]);

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

  return (
    <Layout>
      {/* <div className="container-fluid  custom-homepage h-100">
        <div className="container-fluid  mt-5">
          <div className="row  p-3">
            <div className="col-8 custom-homepage-backgroundImage "></div>
            <div className="col-4 ">
              <div className="container">
                <form>
                  <div className="form-group">
                    <label>Username</label>
                    <input className="form-control" type="text" />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input className="form-control" type="password" />
                  </div>
                  <button className="btn btn-primary">Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </Layout>
  );
};

export default Home;
