const defaultState = {
  name: "",
  email: "",
  imageID: "",
  imgPath: "",
  imageArrayID: "",
  imageArrayPath: [],
  imageArrayLength: "",
  imageVisitArrayID: "",
  imageVisitArrayPath: [],
  imageVisitArrayLength: "",
};

export const userName = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_NAME": {
      console.log(`get name calle ${action.name2} , ${action.useremail} `);
      return {
        ...state,
        name: action.name2,
        email: action.useremail,
      };
    }
    case "SET_IMAGE_ID": {
      return {
        ...state,
        imageID: action.id,
      };
    }
    case "SET_IMAGE_PATH": {
      return {
        ...state,
        imgPath: action.imgPath,
      };
    }
    case "SET_IMAGE_ARRAY_ID": {
      return {
        ...state,
        imageArrayID: action.imgArrayId,
      };
    }
    case "SET_IMAGE_ARRAY_PATH": {
      return {
        ...state,
        imageArrayPath: action.imgArrayPath,
      };
    }
    case "SET_IMAGE_ARRAY_LENGTH": {
      return {
        ...state,
        imageArrayLength: action.imgArrayLength,
      };
    }
    case "SET_VISIT_IMAGE_ARRAY_ID": {
      return {
        ...state,
        imageVisitArrayID: action.imgVisitArrayId,
      };
    }
    case "SET_VISIT_IMAGE_ARRAY_PATH": {
      return {
        ...state,
        imageVisitArrayPath: action.imgVisitArrayPath,
      };
    }
    case "SET_VISIT_IMAGE_ARRAY_LENGTH": {
      return {
        ...state,
        imageVisitArrayLength: action.imgVisitArrayLength,
      };
    }

    case "RESET_STATE": {
      return {
        ...state,
        name: "",
        email: "",
        imageID: "",
        imgPath: "",
        imageArrayPath: "",
        imageArrayID: "",
      };
    }
    default: {
      return state;
    }
  }
};
