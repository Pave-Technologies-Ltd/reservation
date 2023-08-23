interface SingleProperty {
  hotel_facilities: string;
  location: {
    longitude: number;
    latitude: number;
  };
  review_score_word: string;
  class: number;
  hotel_id: number;
  checkout: {
    "24_hour_available": number;
    to: null;
    from: null;
  };
  country: string;
  entrance_photo_url: string;
  district: null;
  is_vacation_rental: number;
  hotel_facilities_filtered: string;
  name: string;
  is_single_unit_vr: number;
  hoteltype_id: number;
  review_score: string;
  checkin: {
    from: null;
    to: null;
    "24_hour_available": number;
  };
  main_photo_id: number;
  languages_spoken: {
    languagecode: string[];
  };
  city: string;
  address: string;
  preferred: number;
  city_id: number;
  countrycode: string;
  main_photo_url: string;
  booking_home: {
    is_vacation_rental: number;
    is_aparthotel: number;
    segment: number;
    quality_class: null;
    group: string;
    is_single_type_property: number;
    is_booking_home: number;
    is_single_unit_property: number;
  };
  currencycode: string;
  url: string;
  ranking: number;
  zip: string;
  preferred_plus: number;
  description_translations: [];
  class_is_estimated: number;
  email: string;
  district_id: number;
  review_nr: number;
}

export default SingleProperty;
