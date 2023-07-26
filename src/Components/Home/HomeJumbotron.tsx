
import { Globe, Home, Vehicle } from "../../assets/svg";


const HomeJumbotron = () => {
  return (
    <div className="md:h-[350px] h-[700px] text-white bg-background px-[10%] pt-[2%] ">
      <div className="flex justify-between">
        <div className="font-bold text-3xl">Reservation.com</div>
        <div className="flex gap-2">
          <button className="p-2 bg-white text-background  font-bold">
            Register
          </button>
          <button className="p-2 bg-white text-background font-bold">
            Sign in
          </button>
        </div>
      </div>
      <div className="flex gap-2 mt-[1%]">
        <button className="py-2 px-4 border flex gap-2 border-white rounded-full">
          <img className=" w-6 h-6 " src={Home} alt="" />
          Stay
        </button>
        <button className="py-2 px-4 hover:bg-lightbackground flex gap-2  rounded-full">
          <img className=" w-6 h-6 " src={Globe} alt="" />
          Flights
        </button>
        <button className="py-2 px-4 hover:bg-lightbackground flex gap-2  rounded-full">
          <img className=" w-6 h-6 " src={Vehicle} alt="" />
          Car Rentals
        </button>
      </div>
      <div className="mt-[5%]">
        <h1 className="text-[50px] font-bold">Find Your Next Stay</h1>
        <h6 className="text-lg">Search low prices on hotels, homes and much more...</h6>
      </div>

     

     
    
    </div>
  );
};

export default HomeJumbotron;
