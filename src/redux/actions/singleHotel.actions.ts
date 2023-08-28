import { Dispatch } from "redux";
// import store, { ReducersType } from '../store';
import {
 GET_SINGLE_HOTEL_FAIL,
 GET_SINGLE_HOTEL_REQUEST,
 GET_SINGLE_HOTEL_SUCCESS
} from "../constants/singleHotel.constanst";
import { Booking_API } from "../../utilities/api";

export const getSingleHotelAction =
  (hotel_id: number | string = "") =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({ type: GET_SINGLE_HOTEL_REQUEST });

      const config = {
        params: {
          hotel_id,
          locale: "en-gb",
        },
        headers: {
          "X-RapidAPI-Key":
            "99e37fd0ebmsh09bd11709ed4f54p103a11jsn59e0a8d93005",
          "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
        },
      };
      const { data } = await Booking_API.get(`/hotels/data`, config);

      dispatch({ type: GET_SINGLE_HOTEL_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_HOTEL_FAIL,
        payload: error,
      });
    }
  };
