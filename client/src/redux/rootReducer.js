import { combineReducers } from "redux";
import suggestReducer from "./suggest/suggestReducer";
import trailerReducer from "./trailer/trailerReducer";

const rootReducer = combineReducers({
  trailer: trailerReducer,
  suggest: suggestReducer,
});

export default rootReducer;
