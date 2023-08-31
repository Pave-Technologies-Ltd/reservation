import { useNavigate } from "react-router-dom";
import { DestinationType } from "../../Types/DestinationType.types";

interface DestinationComponentType {
  destination: DestinationType;
}

const Destination = ({ destination }: DestinationComponentType) => {
  const navigate = useNavigate();
  return (
    <div
      className="relative"
      onClick={() => {
        navigate({
          pathname: "/searchResults",
          search: `?CN=${destination.searchOptions.city_name}&room=${destination.searchOptions.room}&adult=${destination.searchOptions.adult}&children_number=${destination.searchOptions.children_number}&checkin_date=${destination.searchOptions.checkin_date}&checkout_date=${destination.searchOptions.checkout_date}&dest_type=${destination.searchOptions.dest_type}&dest_id=${destination.searchOptions.dest_id}`,
        });
      }}
    >
      <img
        src={destination.image}
        className={`h-[260px]   w-full basis-1/2 border  hover:border-yellow-400 cursor-pointer `}
      ></img>

      <div className="absolute flex gap-4 top-6 left-4 items-center">
        <h1 className="text-white  font-bold text-2xl  ">
          {destination.destination}
        </h1>
        <img className="w-8 h-8" src={destination.flag} alt="" />
      </div>
    </div>
  );
};

export default Destination;
