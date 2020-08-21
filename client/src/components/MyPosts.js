import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import { useSelector } from "react-redux";

const MyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);
  const authors = useSelector((state) => state);
  const postedByEmail = localStorage.getItem("userEmailInLocalStorage");
  useEffect(() => {
    axios
      .post("/get-post-of-user", {
        postedByEmail,
      })
      .then((res) => {
        console.log("Fetching each user posts", authors, res);
        setMyPosts(res.data.result);
      })
      .catch((err) => {
        console.log("Error in fetching from database", postedByEmail, err);
      });
  }, []);

  return (
    <Layout>
      <h1>MY Posts {authors.name}</h1>
      <div>
        {myPosts.map((post) => {
          return (
            <div className="card mt-4 custom-article-form" key={post._id}>
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img
                    src={post.imagePath}
                    className="card-img img-fluid"
                    alt="lol"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-title">{post.title}</div>
                  <div className="card-body">
                    {post.description}
                    <p>{post.markdown}</p>
                    <p>posted by: {post.author}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default MyPosts;
