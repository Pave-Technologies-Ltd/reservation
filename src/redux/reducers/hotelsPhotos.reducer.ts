
import {
  GET_HOTEL_PHOTOS_FAIL,
  GET_HOTEL_PHOTOS_REQUEST,
  GET_HOTEL_PHOTOS_SUCCESS
} from "../constants/hotelsPhotos.constants";
import {
  initialStateRequest,
  reservationsResponseType,
} from "./hotels.reducer";

export const getHotelPhotosReducer = (
  state: reservationsResponseType = initialStateRequest,
  action: { type: string; payload: unknown }
) => {
  switch (action.type) {
    case GET_HOTEL_PHOTOS_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        serverResponse: {},
        serverError: {},
      };

    case GET_HOTEL_PHOTOS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        serverResponse: action.payload,
        serverError: {},
      };

    case GET_HOTEL_PHOTOS_FAIL:
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
