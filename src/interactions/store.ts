import { createStore } from "redux";
import { containerReducer } from "./reducers/containerReducer";

export const store = createStore(containerReducer);
