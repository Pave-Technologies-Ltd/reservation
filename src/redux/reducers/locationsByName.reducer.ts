
import { GET_LOCATIONS_BY_NAME_FAIL, GET_LOCATIONS_BY_NAME_REQUEST, GET_LOCATIONS_BY_NAME_SUCCESS } from "../constants/locationsByName.constants";
import { initialStateRequest, reservationsResponseType } from "./hotels.reducer";



export const getLocationsByNameReducer = (
  state: reservationsResponseType = initialStateRequest,
  action: { type: string; payload: unknown }
) => {
  switch (action.type) {
    case GET_LOCATIONS_BY_NAME_REQUEST:
      return {
        ...state,
        loading: true,
        success: false,
        serverResponse: {},
        serverError: {},
      };

    case GET_LOCATIONS_BY_NAME_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        serverResponse: action.payload,
        serverError: {},
      };

    case GET_LOCATIONS_BY_NAME_FAIL:
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
