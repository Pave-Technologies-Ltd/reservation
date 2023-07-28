
import Destination from "../Components/Home/Destination";
import HomeJumbotron from "../Components/Home/HomeJumbotron";
import Offer from "../Components/Home/Offer";

import SearchBar from "../Components/Home/SearchBar";
import Subscribe from "../Components/Home/Subscribe";
import Slider from "../Components/Slider";
import PropertyTypes from "../mock/PropertyTypes";


const Home = () => {
  return (
    <div className="">
      <HomeJumbotron />
      <SearchBar />
      {/* Offers */}
      <div className="md:px-[10%] px-[5%] mt-[5%]">
        <h1 className="text-3xl font-semibold">Offers</h1>
        <h6 className="text-md text-[#6b9ccf]">
          Promotions, deals and special offers for you
        </h6>
        <div className="flex md:flex-nowrap flex-wrap gap-6 mt-4">
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
      <Subscribe/>
    </div>
  );
};

export default Home;