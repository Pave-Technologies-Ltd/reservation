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
        navigate("");
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
