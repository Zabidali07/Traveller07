import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Uploadimage from "./Uploadimage";
import UploadArray from "./UploadArray";
import UploadVisitedPlaceArray from "./UploadVistedPlaceArray";

const NewArticle = () => {
  let history = useHistory();
  const [formInputs, setFormInputs] = useState({
    title: "",
    description: "",
    markdown: "",
    buttonText: "Submit",
    cusineImagesDescription: [],
    visitedPlacesImagesDescription: [],
  });

  let cusineImagesDescription = [];
  let visitedPlacesImagesDescription = [];

  const { title, description, markdown, buttonText } = formInputs;
  const authors = useSelector((state) => state);

  const author = localStorage.getItem("userNameInLocalStorage");
  const images = authors.imageID;
  const imagePath = authors.imgPath;
  const postedByEmail = localStorage.getItem("userEmailInLocalStorage");
  const cusineImages = authors.imageArrayID;
  const cusineImagesPath = authors.imageArrayPath;
  const visitedPlaceImages = authors.imageVisitArrayID;
  const visitedPlacesImagesPath = authors.imageVisitArrayPath;

  const [cusine, setCusine] = useState([]);
  const [visited, setVisited] = useState([]);

  const [showSideCusine, setShowSideCusine] = useState([]);

  const [eachCusine, setEachCusine] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
  });
  const [eachVisited, setEachVisited] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
  });

  const handleDescriptionChange = (event) => {
    setEachCusine({ ...eachCusine, [event.target.name]: event.target.value });
  };

  const handleVisitedDescription = (event) => {
    setEachVisited({ ...eachVisited, [event.target.name]: event.target.value });
  };

  const handleChange = (event) => {
    setFormInputs({
      ...formInputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("gone gobn");

    for (let i = 0; i < cusine.length; i++) {
      cusineImagesDescription.push(eachCusine[i]);
    }

    for (let i = 0; i < visited.length; i++) {
      visitedPlacesImagesDescription.push(eachVisited[i]);
    }

    setFormInputs({ ...formInputs, buttonText: "Submitting" });

    axios
      .post("/add-new-article", {
        title,
        description,
        markdown,
        author,
        images,
        imagePath,
        postedByEmail,
        cusineImages,
        cusineImagesPath,
        visitedPlaceImages,
        visitedPlacesImagesPath,
        cusineImagesDescription,
        visitedPlacesImagesDescription,
      })
      .then((res) => {
        console.log(`new article posted ${res} and ${author} and ${images}`);
        setFormInputs({
          ...formInputs,
          title: "",
          description: "",
          markdown: "",
          buttonText: "Submitted",
        });
        history.push("/user/dashboard");
      })
      .catch((err) => {
        console.log(
          `There is error while pushing to database from frontend ${err}`
        );
      });
  };

  return (
    <Layout>
      <div>
        <div className="container">
          <h2 className="text-center">Add New Article</h2>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div>
              {" "}
              Upload the image of the city
              <Uploadimage />
              <br />
            </div>
            <div>
              {" "}
              upload cusine image (upto 6 images)
              <br /> <UploadArray setCusine={setCusine} />{" "}
            </div>
            <div>
              {" "}
              upload visited place image (upto 6 images)
              <br /> <UploadVisitedPlaceArray setVisited={setVisited} />{" "}
            </div>
          </div>
          <div className="col-md-8">
            <form>
              <div className="form-group">
                <label>Title</label>
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  value={title}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  type="text"
                  rows="4"
                  name="description"
                  value={description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                {cusine.map((inp, index) => (
                  <div key={index} className="form-group">
                    <label>Describe you {index} cusine </label>
                    <textarea
                      className="form-control"
                      type="text"
                      rows="2"
                      name={index}
                      onChange={handleDescriptionChange}
                    ></textarea>
                  </div>
                ))}
              </div>
              <div>
                {visited.map((inp, index) => (
                  <div key={index} className="form-group">
                    <label>Describe you {index} visited place </label>
                    <textarea
                      className="form-control"
                      type="text"
                      rows="2"
                      name={index}
                      onChange={handleVisitedDescription}
                    ></textarea>
                  </div>
                ))}
              </div>

              <div className="form-group">
                <label>Markdown</label>
                <textarea
                  rows="3"
                  className="form-control"
                  type="text"
                  name="markdown"
                  value={markdown}
                  onChange={handleChange}
                ></textarea>
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
          </div>
        </div>
      </div>{" "}
    </Layout>
  );
};

export default NewArticle;
