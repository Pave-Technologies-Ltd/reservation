import {
GET_HOTEL_DESCRIPTION_FAIL,
GET_HOTEL_DESCRIPTION_REQUEST,
GET_HOTEL_DESCRIPTION_SUCCESS
} from "../constants/hotelsdescription";
import {
  initialStateRequest,
  reservationsResponseType,
} from "./hotels.reducer";

export const getHotelDescriptionReducer = (
  state: reservationsResponseType = initialStateRequest,
  action: { type: string; payload: unknown }
) => {
  switch (action.type) {
    case GET_HOTEL_DESCRIPTION_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        serverResponse: {},
        serverError: {},
      };

    case GET_HOTEL_DESCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        serverResponse: action.payload,
        serverError: {},
      };

    case GET_HOTEL_DESCRIPTION_FAIL:
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
