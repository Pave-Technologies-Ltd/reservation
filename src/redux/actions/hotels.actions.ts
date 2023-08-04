import { Dispatch } from 'redux'
// import store, { ReducersType } from '../store';
import { GET_HOTELS_SUCCESS ,GET_HOTELS_FAIL,GET_HOTELS_REQUEST} from '../constants/hotels.constants';
import { Booking_API } from '../../utilities/api';

export const getHotelsAction =
  () =>
  async (dispatch: Dispatch, ) => {
    try {
      dispatch({ type: GET_HOTELS_REQUEST })

      const config = {
        params: {
    checkin_date: '2023-09-27',
    dest_type: 'city',
    units: 'metric',
    checkout_date: '2023-09-28',
    adults_number: '2',
    order_by: 'popularity',
    dest_id: '-553173',
    filter_by_currency: 'AED',
    locale: 'en-gb',
    room_number: '1',
    children_number: '2',
    children_ages: '5,0',
    categories_filter_ids: 'class::2,class::4,free_cancellation::1',
    page_number: '0',
    include_adjacency: 'true'
  },
       headers: {
    'X-RapidAPI-Key': '894a603dbbmsh29f902309717301p1e866ejsn951d60a3dbd4',
    'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
  }
      }
  const { data } = await Booking_API.get(`/hotels/search`, config)

        dispatch({ type: GET_HOTELS_SUCCESS, payload: data })
      
    } catch (error) {
      dispatch({
        type: GET_HOTELS_FAIL,
        payload: error,
      })
    }
  }