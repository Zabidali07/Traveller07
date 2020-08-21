import { createStore } from "redux";
import { userName } from "../store/reducers/users";

const store = createStore(userName);

export default store;
