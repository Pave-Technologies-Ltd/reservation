import { useNavigate } from "react-router-dom";
import SearchBar from "./Home/SearchBar";


const TopBar = () => {
  
    const navigate = useNavigate();

   const SearchButtonHandler = ({
     room,
     adult,
     checkin_date,
     checkout_date,
     dest_type,
     dest_id,
     children_number,
     city_name,
   }: {
     room: string;
     adult: string;
     checkin_date: string;
     checkout_date: string;
     children_number: string;
     dest_type: string | undefined;
     dest_id: string | undefined;
     city_name: string | undefined;
   }) => {
     // console.log(city_name)

     if (
       city_name === undefined &&
       checkout_date === "undefined-undefined-undefined" &&
       checkin_date === "undefined-undefined-undefined"
     ) {
       alert("Location Field and Checkin Date and Checkout Date are Empty");
     }

     if (
       checkout_date === "undefined-undefined-undefined" ||
       checkin_date === "undefined-undefined-undefined"
     ) {
       alert("Checkin Date or  Checkout Date is Empty");
     }

    
     navigate({
       pathname: "/searchResults",
       search: `?CN=${city_name}&room=${room}&adult=${adult}&children_number=${children_number}&checkin_date=${checkin_date}&checkout_date=${checkout_date}&dest_type=${dest_type}&dest_id=${dest_id}`,
     });
   };

  return (
    <div className="bg-background md:px-[10%] px-[5%] relative flex items-center h-[150px]  cursor-pointer">
      <div
        onClick={() => {
          navigate("/");
        }}
        className="font-bold text-3xl text-white "
      >
        Reservation.com
      </div>
      <SearchBar searchButtonHandler={SearchButtonHandler} />
    </div>
  );
}

export default TopBar