import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  getHotelsReducer,
  reservationsResponseType,
} from "./reducers/hotels.reducer";
import { getLocationsByNameReducer } from "./reducers/locationsByName.reducer";

export type ReducersType = {
  hotels: reservationsResponseType;
  locations: reservationsResponseType;
};
const reducer = combineReducers({
  hotels: getHotelsReducer,
  locations: getLocationsByNameReducer,
});

const middleware = [thunk];

const initialState = {};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
