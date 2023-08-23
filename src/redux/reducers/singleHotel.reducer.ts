import {
  GET_SINGLE_HOTEL_FAIL,
  GET_SINGLE_HOTEL_REQUEST,
  GET_SINGLE_HOTEL_SUCCESS,
} from "../constants/singleHotel.constanst";
import {
  initialStateRequest,
  reservationsResponseType,
} from "./hotels.reducer";

export const getSingleHotelReducer = (
  state: reservationsResponseType = initialStateRequest,
  action: { type: string; payload: unknown }
) => {
  switch (action.type) {
    case GET_SINGLE_HOTEL_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        serverResponse: {},
        serverError: {},
      };

    case GET_SINGLE_HOTEL_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        serverResponse: action.payload,
        serverError: {},
      };

    case GET_SINGLE_HOTEL_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        serverResponse: {},
        serverError: action.payload,
      };

    default:
      return state;
  }
};
