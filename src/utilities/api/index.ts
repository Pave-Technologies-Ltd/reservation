import axios  from "axios"
import rateLimit from "axios-rate-limit";
export const BookingBaseURL = 'https://booking-com.p.rapidapi.com/v1'

export const Booking_API = rateLimit(
  axios.create({
    baseURL: BookingBaseURL,
  }),
  { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 }
); 