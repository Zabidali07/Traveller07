import React, { useState, useCallback } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

const UploadArray = ({ setCusine }) => {
  const dispatch = useDispatch();
  const [imgCollections, setImageCollections] = useState({});
  const [buttonAppearance, setButtonAppearance] = useState({
    text: "Upload",
    color: "",
  });
  let newArr = [];
  const handleChange = useCallback((e) => {
    setImageCollections(e.target.files);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const data = new FormData();

      for (const keys of Object.keys(imgCollections)) {
        data.append("imgCollection", imgCollections[keys]);
      }
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      axios
        .post("/image-upload-array", data, config)
        .then((res) => {
          console.log("IMAGE UPLOAD SUCESS", res.data.document.imgCollection);
          for (let i = 0; i < res.data.document.imgCollection.length; i++) {
            newArr.push(i);
          }
          setCusine(res.data.document.imgCollection);
          localStorage.setItem(
            "getNoOfCusineImages",
            res.data.document.imgCollection.length
          );
          setButtonAppearance({
            text: "Uploaded",
            color: "#5B8930",
          });
          dispatch({
            type: "SET_IMAGE_ARRAY_ID",
            imgArrayId: res.data.document._id,
          });

          dispatch({
            type: "SET_IMAGE_ARRAY_PATH",
            imgArrayPath: res.data.document.imgCollection,
          });
          dispatch({
            type: "SET_IMAGE_ARRAY_LENGTH",
            imgArrayLength: res.data.document.imgCollection.length,
          });
        })
        .catch((err) => {
          if (err) {
            console.log(`IMAGE UPLOAD ERROR ${err}`);
          }
        });
    },
    [imgCollections]
  );

  return (
    <div className="container">
      <div className="row">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="file"
              name="imgCollection"
              onChange={handleChange}
              multiple
            />
            <div className="form-group mt-2">
              {" "}
              <button
                className="btn btn-primary"
                style={{ backgroundColor: buttonAppearance.color }}
                type="submit"
              >
                {buttonAppearance.text}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadArray;
