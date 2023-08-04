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
        },
        headers: {
          "X-RapidAPI-Key":
            "894a603dbbmsh29f902309717301p1e866ejsn951d60a3dbd4",
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
