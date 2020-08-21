import React, { useState, useCallback } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

const UploadVisitedPlaceArray = ({ setVisited }) => {
  const dispatch = useDispatch();
  const [imgCollections, setImageCollections] = useState({});
  const [buttonAppearance, setButtonAppearance] = useState({
    text: "Upload",
    color: "",
  });

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
          console.log("IMAGE UPLOAD SUCESS", res);
          setButtonAppearance({
            text: "Uploaded",
            color: "#5B8930",
          });
          setVisited(res.data.document.imgCollection);
          dispatch({
            type: "SET_VISIT_IMAGE_ARRAY_ID",
            imgVisitArrayId: res.data.document._id,
          });
          dispatch({
            type: "SET_VISIT_IMAGE_ARRAY_PATH",
            imgVisitArrayPath: res.data.document.imgCollection,
          });
          dispatch({
            type: "SET_VISIT_IMAGE_ARRAY_LENGTH",
            imgVisitArrayLength: res.data.document.imgCollection.length,
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
    <form>
      <div>
        <input
          type="file"
          name="imgCollection"
          onChange={handleChange}
          multiple
        />{" "}
        <div className="mt-2">
          {" "}
          <button
            className="btn btn-primary"
            style={{ backgroundColor: buttonAppearance.color }}
            onClick={handleSubmit}
          >
            {buttonAppearance.text}
          </button>
        </div>
      </div>
    </form>
  );
};

export default UploadVisitedPlaceArray;
