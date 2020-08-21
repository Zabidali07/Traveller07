import React, { useState, useCallback } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

const Uploadimage = () => {
  const dispatch = useDispatch();
  const [fileUpload, setFileUpload] = useState();
  const [buttonAppearance, setButtonAppearance] = useState({
    text: "Upload",
    color: "",
  });

  const handleImageChange = useCallback((event) => {
    setFileUpload(event.target.files[0]);
  }, []);

  const handleUploadImage = useCallback(() => {
    const data = new FormData();
    data.append("myImage", fileUpload);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .post("/image-upload", data, config)
      .then((res) => {
        console.log("IMAGE UPLOAD SUCESS", res);
        setButtonAppearance({
          text: "Uploaded",
          color: "#5B8930",
        });
        dispatch({
          type: "SET_IMAGE_ID",
          id: res.data.document._id,
        });
        dispatch({
          type: "SET_IMAGE_PATH",
          imgPath: res.data.document.imageData,
        });
      })
      .catch((err) => {
        if (err) {
          console.log(`IMAGE UPLOAD ERROR ${err}`);
        }
      });
  }, [fileUpload]);

  return (
    <form>
      <div>
        <input
          type="file"
          name="file"
          placeholder=" Upload the image of the city"
          onChange={handleImageChange}
        />

        <div className="mt-2">
          <button
            type="button"
            className="btn btn-primary"
            style={{ backgroundColor: buttonAppearance.color }}
            onClick={handleUploadImage}
          >
            {buttonAppearance.text}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Uploadimage;
