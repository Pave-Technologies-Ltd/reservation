// import { useDispatch } from "react-redux";
import Destination from "../Components/Home/Destination";
import HomeJumbotron from "../Components/Home/HomeJumbotron";
import Offer from "../Components/Home/Offer";

import SearchBar from "../Components/Home/SearchBar";
import Subscribe from "../Components/Home/Subscribe";
import Slider from "../Components/Slider";
import PropertyTypes from "../mock/PropertyTypes";
import { useNavigate } from "react-router-dom";
// import { getHotelsAction } from "../redux/actions/hotels.actions";

const Home = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const searchButtonHandler = ({
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
    <>
      <div className="">
        <HomeJumbotron />
        <SearchBar searchButtonHandler={searchButtonHandler} />
        {/* Offers */}
        <div className="md:px-[10%] px-[5%] md:mt-[5%] mt-[20%]">
          <h1 className="text-3xl font-semibold">Offers</h1>
          <h6 className="text-md text-[#6b9ccf]">
            Promotions, deals and special offers for you
          </h6>
          <div className="flex lg:flex-nowrap flex-wrap gap-6 mt-4">
            <Offer />
            <Offer />
          </div>
        </div>
        {/* Destinations */}
        <div className="md:px-[10%] px-[5%] md:mt-[5%] mt-[10%]">
          <h1 className="text-3xl font-semibold">Trending Destinations</h1>
          <h6 className="text-md text-[#6b9ccf]">
            Most popular choices for travellers from Nigeria
          </h6>
          <div className=" grid md:grid-cols-2 grid-cols-1  gap-6 mt-4">
            <Destination />
            <Destination />
            <Destination />
            <Destination />
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
