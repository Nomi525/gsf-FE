import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import localStorage from "redux-persist/es/storage";
import thunk from "redux-thunk";
import RootReducer from "./RootReducer";

const persistConfig = {
  key: "root",
  storage: localStorage,
};
const persistedReducer = persistReducer(persistConfig, RootReducer);
export default () => {
  let store = createStore(persistedReducer, {}, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return { store, persistor };
};
