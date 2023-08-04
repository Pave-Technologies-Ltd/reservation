import axios  from "axios"
export const BookingBaseURL = 'https://booking-com.p.rapidapi.com/v1'

export const Booking_API = axios.create({
  baseURL: BookingBaseURL,
})