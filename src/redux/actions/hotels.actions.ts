import { Dispatch } from 'redux'
// import store, { ReducersType } from '../store';
import { GET_HOTELS_SUCCESS ,GET_HOTELS_FAIL,GET_HOTELS_REQUEST} from '../constants/hotels.constants';
import { Booking_API } from '../../utilities/api';

export const getHotelsAction =
  (
    room_number: string,
    adults_number: string,
    checkin_date: string,
    checkout_date:string,
    dest_type:string | undefined,
    dest_id:string | undefined,
    children_number:string ='1'
  ) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({ type: GET_HOTELS_REQUEST });

      const config = {
        params: {
          checkin_date,
          dest_type,
          units: "metric",
          checkout_date,
          adults_number,
          order_by: "popularity",
          dest_id,
          filter_by_currency: "USD",
          locale: "en-gb",
          room_number,
          children_number,

          categories_filter_ids: "class::2,class::4,free_cancellation::1",
          page_number: "0",
          include_adjacency: "true",
        },
        headers: {
          "X-RapidAPI-Key":
            "99e37fd0ebmsh09bd11709ed4f54p103a11jsn59e0a8d93005",
          "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
        },
      };
      const { data } = await Booking_API.get(`/hotels/search`, config);
     

       dispatch({ type: GET_HOTELS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_HOTELS_FAIL,
        payload: error,
      });
    }
  };