// import { useDispatch } from "react-redux";

// import HomeJumbotron from "../Components/Home/HomeJumbotron";
// import axios from "axios";
import Destination from "../Components/Home/Destination";
// import Offer from "../Components/Home/Offer";

// import SearchBar from "../Components/Home/SearchBar";
import Subscribe from "../Components/Home/Subscribe";
import Slider from "../Components/Slider";
import TopBar from "../Components/TopBar";
import { DestinationType } from "../Types/DestinationType.types";
import PropertyTypes from "../mock/PropertyTypes";


// import { useNavigate } from "react-router-dom";

// import { getHotelsAction } from "../redux/actions/hotels.actions";

const Home = () => {
  // const [latitude, setLatitude] = useState("");
  // const [longitude, setLongitude] = useState("");
  // const navigate = useNavigate();

  // const dispatch = useDispatch();
  // const SearchButtonHandler = ({
  //   room,
  //   adult,
  //   checkin_date,
  //   checkout_date,
  //   dest_type,
  //   dest_id,
  //   children_number,
  //   city_name,
  // }: {
  //   room: string;
  //   adult: string;
  //   checkin_date: string;
  //   checkout_date: string;
  //   children_number: string;
  //   dest_type: string | undefined;
  //   dest_id: string | undefined;
  //   city_name: string | undefined;
  // }) => {
  //   // console.log(city_name)

  //   if (
  //     city_name === undefined &&
  //     checkout_date === "undefined-undefined-undefined" &&
  //     checkin_date === "undefined-undefined-undefined"
  //   ) {
  //     alert("Location Field and Checkin Date and Checkout Date are Empty");
  //   }

  //   if (
  //     checkout_date === "undefined-undefined-undefined" ||
  //     checkin_date === "undefined-undefined-undefined"
  //   ) {
  //     alert("Checkin Date or  Checkout Date is Empty");
  //   }

  //   navigate({
  //     pathname: "/searchResults",
  //     search: `?CN=${city_name}&room=${room}&adult=${adult}&children_number=${children_number}&checkin_date=${checkin_date}&checkout_date=${checkout_date}&dest_type=${dest_type}&dest_id=${dest_id}`,
  //   });
  // };

  (async () => {
    try {
      // const res = await axios.get(
      //   "https://extreme-ip-lookup.com/json/?key=S8L2NUVgp0XJQcjRRsy0"
      // );
      // console.log(res.data);
      // setLatitude(res.data.lat);
      // setLongitude(res.data.lon)
      // console.log(
      //   `User's location: Latitude ${latitude}, Longitude ${longitude}`
      // );
    } catch (error) {
      console.error("Error getting user location:", error);
    }
  })();

   const todaysDate = new Date();
   const sevensDayDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

   const day = todaysDate.getDate();
   
   const month = todaysDate.getMonth() + 1;
   const year = todaysDate.getFullYear();


   const sevensDay =sevensDayDate.getDate()
   const sevensDayMonth = sevensDayDate.getMonth() + 1
   const sevensDayYear = sevensDayDate.getFullYear()

   // This arrangement can be altered based on how we want the date's format to appear.
   const currentDate = `${year}-${month}-${day}`;

  const nextDate = `${sevensDayYear}-${sevensDayMonth}-${sevensDay}`;
   

  const trendingDestinations: DestinationType[] = [
    {
      image: "dubai.jpg",
      destination: "Dubai",
      url: "",
      flag: "dubaiFlag.svg",
      searchOptions: {
        dest_id: "-782831",
        dest_type: "city",
        adult: "1",
        children_number: "1",
        checkin_date: `${currentDate}`,
        checkout_date: `${nextDate}`,
        room: "1",
        city_name: "Dubai",
      },
    },
    {
      image: "paris.jpeg",
      destination: "Paris",
      url: "",
      flag: "franceFlag.svg",
      searchOptions: {
        dest_id: "-1456928",
        dest_type: "city",
        adult: "1",
        children_number: "1",
        checkin_date: `${currentDate}`,
        checkout_date: `${nextDate}`,
        room: "1",
        city_name: "Paris",
      },
    },
    {
      image: "london.jpeg",
      destination: "London",
      url: "",
      flag: "londonFlag.svg",
      searchOptions: {
        dest_id: "-2601889",
        dest_type: "city",
        adult: "1",
        children_number: "1",
        checkin_date: `${currentDate}`,
        checkout_date: `${nextDate}`,
        room: "1",
        city_name: "London",
      },
    },
    {
      image: "lagos.jpeg",
      destination: "Lagos",
      url: "",
      flag: "nigeriaFlag.svg",
      searchOptions: {
        dest_id: "-2017355",
        dest_type: "city",
        adult: "1",
        children_number: "1",
        checkin_date: `${currentDate}`,
        checkout_date: `${nextDate}`,
        room: "1",
        city_name: "Lagos",
      },
    },
  ];




  return (
    <>
      <div className="">
        <TopBar />
        {/* <HomeJumbotron />
        <SearchBar searchButtonHandler={SearchButtonHandler} /> */}
        {/* Offers */}
        {/* <div className="md:px-[10%] px-[5%] lg:mt-[5%] md:mt-[40%] mt-[50%]">
          <h1 className="text-3xl font-semibold">Offers</h1>
          <h6 className="text-md text-[#6b9ccf]">
            Promotions, deals and special offers for you
          </h6>
          <div className="flex lg:flex-nowrap flex-wrap gap-6 mt-4">
            <Offer />
            <Offer />
          </div>
        </div> */}
        {/* Destinations */}
        <div className="md:px-[10%] px-[5%] md:mt-[5%] mt-[50%]">
          <h1 className="text-3xl font-semibold">Trending Destinations</h1>
          {/* <h6 className="text-md text-[#6b9ccf]">
            Most popular choices for travellers from Nigeria
          </h6> */}
          <div className=" grid md:grid-cols-2 grid-cols-1  gap-6 mt-4">
            {trendingDestinations.map((destination) => (
              <Destination
                key={destination.destination}
                destination={destination}
              />
            ))}
          </div>
        </div>
        {/* Property Type */}

        {/* Slider */}
        <div className="px-[10%] my-6">
          <Slider data={PropertyTypes} />
        </div>
        <Subscribe />
      </div>
    </>
  );
};

export default Home;
