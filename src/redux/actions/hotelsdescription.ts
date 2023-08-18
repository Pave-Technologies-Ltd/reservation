import { Dispatch } from "redux";
// import store, { ReducersType } from '../store';
import {
  GET_HOTEL_DESCRIPTION_REQUEST,
  GET_HOTEL_DESCRIPTION_FAIL,
  GET_HOTEL_DESCRIPTION_SUCCESS,
} from "../constants/hotelsdescription";
import { Booking_API } from "../../utilities/api";

export const getHotelDescriptionAction =
  (hotel_id: number | string  ='') => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: GET_HOTEL_DESCRIPTION_REQUEST });

      const config = {
        params: {
          hotel_id,
          locale: "en-gb",
        },
        headers: {
          "X-RapidAPI-Key":
            "58384481e7mshce8cc708fd6414ap1f6838jsna9f2faf27f7c",
          "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
        },
      };
      const { data } = await Booking_API.get(`/hotels/description`, config);

      dispatch({ type: GET_HOTEL_DESCRIPTION_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_HOTEL_DESCRIPTION_FAIL,
        payload: error,
      });
    }
  };
