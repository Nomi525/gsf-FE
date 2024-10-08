import { combineReducers } from "redux";
import { ProfileDetails, adminLoginReducer } from "./admin/Reducer";

const RootReducer = combineReducers({
  adminLoginReducer: adminLoginReducer,
  ProfileDetails:ProfileDetails,
});

export default RootReducer;
