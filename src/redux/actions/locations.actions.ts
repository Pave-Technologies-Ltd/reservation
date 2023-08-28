import { Dispatch } from "redux";
// import store, { ReducersType } from '../store';

import { Booking_API } from "../../utilities/api";
import {
  GET_LOCATIONS_BY_NAME_FAIL,
  GET_LOCATIONS_BY_NAME_REQUEST,
  GET_LOCATIONS_BY_NAME_SUCCESS,
} from "../constants/locationsByName.constants";

export const getLocationsByNameAction =
  (name: string) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: GET_LOCATIONS_BY_NAME_REQUEST });

      const config = {
        params: {
          name,
          locale: "en-gb",
          page_size: "2",
        },
        headers: {
          "X-RapidAPI-Key":
            "99e37fd0ebmsh09bd11709ed4f54p103a11jsn59e0a8d93005",
          "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
        },
      };
      const { data } = await Booking_API.get(`/hotels/locations`, config);

      dispatch({ type: GET_LOCATIONS_BY_NAME_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_LOCATIONS_BY_NAME_FAIL,
        payload: error,
      });
    }
  };
