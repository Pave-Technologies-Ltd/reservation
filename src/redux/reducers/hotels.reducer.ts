import { GET_HOTELS_FAIL, GET_HOTELS_REQUEST, GET_HOTELS_SUCCESS } from "../constants/hotels.constants"


export type reservationsResponseType = {
  loading: boolean;
  success?: boolean;
  serverResponse?: unknown;
  serverError?: {
    status?: string;
    error?: {
      message?: string;
    };
  };
};

export const initialStateRequest = {
  loading: false,
  success: false,
  serverResponse: {},
  serverError: {},
}


export const getHotelsReducer = (state: reservationsResponseType = initialStateRequest, action: { type: string; payload: unknown }) => {
  switch (action.type) {
    case GET_HOTELS_REQUEST:
      return { ...state, loading: true, success: false, serverResponse: {}, serverError: {} }

    case GET_HOTELS_SUCCESS:
      return { ...state, loading: false, success: true, serverResponse: action.payload, serverError: {} }

    case GET_HOTELS_FAIL:
      return { ...state, loading: false, success: false, serverResponse: {}, serverError: action.payload }

    default:
      return state
  }
}