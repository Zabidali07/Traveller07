import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./Layout";

const Fullpage = ({ match }) => {
  let [article, setArticle] = useState([]);

  const [keys, setKeys] = useState({
    author: "",
    cusineImagesPath: [],
    cusineImagesDescription: [],
    visitedPlacesImagesPath: [],
    visitedPlacesImagesDescription: [],
    title: "",
    description: "",
    markdown: "",
    imagePath: "",
    postedByEmail: "",
  });

  const id = match.params.userToken;

  useEffect(() => {
    axios
      .post("/get-one-article", { id })
      .then((res) => {
        console.log("fetching posts from server SUCCESS", res);
        setArticle(res.data.result);
        setKeys({
          ...keys,
          author: res.data.result.author,
          cusineImagesPath: res.data.result.cusineImagesPath,
          cusineImagesDescription: res.data.result.cusineImagesDescription,
          visitedPlacesImagesPath: res.data.result.visitedPlacesImagesPath,
          visitedPlacesImagesDescription:
            res.data.result.visitedPlacesImagesDescription,
          title: res.data.result.title,
          description: res.data.result.description,
          markdown: res.data.result.markdown,
          imagePath: res.data.result.imagePath,
          postedByEmail: res.data.result.postedByEmail,
        });
      })
      .catch((err) => {
        if (err) {
          console.log("Error in fetching from database", err);
        }
      });
  }, []);

  const {
    author,
    cusineImagesPath,
    cusineImagesDescription,
    visitedPlacesImagesPath,
    visitedPlacesImagesDescription,
    title,
    description,
    markdown,
    imagePath,
    postedByEmail,
  } = keys;

  return (
    <div className="container-fluid custom-top-background-blog ">
      <Layout>
        <h1
          className="text-center"
          style={{
            color: "#ba8b02",
            fontWeight: "500",
            letterSpacing: "5px",
          }}
        >
          {title}{" "}
        </h1>
        <div className="container ">
          <div className="row mt-3">
            <div className="col-md-4">
              {" "}
              <img
                src={article.imagePath}
                style={{ height: "300px" }}
                className="img-responsive"
              />
            </div>
            <div className="col-md-8 text-center mt-10">
              {" "}
              {description}
              <br />
              {markdown}
            </div>
          </div>
        </div>

        <div className="container ">
          <div className="row">
            {visitedPlacesImagesPath.map((eachPath, index) => (
              <div key={index} className="col-md-4  mt-2 mb-2">
                <div className="card custom-blog-background-card">
                  {" "}
                  <img
                    style={{ height: "300px" }}
                    id="imgCard"
                    className="card-img-top img-fluid mx-auto"
                    src={eachPath}
                  />{" "}
                  <div className="card-body" style={{ color: "#ee9ca7" }}>
                    {" "}
                    {visitedPlacesImagesDescription[index]}{" "}
                  </div>
                </div>{" "}
              </div>
            ))}
          </div>
        </div>

        <div className="container">
          <div className="row overflow-auto">
            {cusineImagesPath.map((eachPath, index) => (
              <div key={index} className="col-md-4">
                <div className="card custom-blog-background-card ">
                  {" "}
                  <img
                    id="imgCard"
                    className="card-img-top img-fluid"
                    src={eachPath}
                  />{" "}
                  <div className="card-body" style={{ color: "#ee9ca7" }}>
                    {" "}
                    {cusineImagesDescription[index]}{" "}
                  </div>
                </div>{" "}
              </div>
            ))}
          </div>
          <h2 className="float-right">{author}</h2>
        </div>
      </Layout>
    </div>
  );
};

export default Fullpage;
