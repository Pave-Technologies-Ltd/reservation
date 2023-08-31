export interface DestinationType {
  image: string;
  destination: string;
  url: string;
  flag: string;
  searchOptions: {
    city_name: string;
    room: string;
    adult: string;
    children_number: string;
    checkin_date: string;
    checkout_date: string;
    dest_type: string;
    dest_id: string;
  };
}
