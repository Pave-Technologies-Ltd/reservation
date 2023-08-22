
import { useNavigate } from "react-router-dom";

// import CurrencyList from 'currency-list'
import {  useEffect } from "react";
// import { useDispatch ,useSelector} from "react-redux";
// import { getHotelsAction } from "../../redux/actions/hotels.actions";

// import { ReducersType } from "../../redux/store";
// import { reservationsResponseType } from "../../redux/reducers/hotels.reducer";

// interface HomeJumbotronType{


// }
const HomeJumbotron = () => {
  // const dispatch =useDispatch()
  const navigate = useNavigate()
  // const allHotels = useSelector<ReducersType>((state: ReducersType) => state?.hotels) as reservationsResponseType


  useEffect(()=>{
    // console.log('worked')
    // dispatch(getHotelsAction() as never)
    // console.log(CurrencyList.getAll()) 
  },[])

  // console.log(allHotels)
  return (
    <div className="md:h-[350px] h-[500px] text-white bg-background md:px-[10%] px-[5%] pt-[2%] ">
      <div className="flex justify-between">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="font-bold text-3xl cursor-pointer md:p-2 p-1 md:px-1 px-2 bg-white text-background "
        >
          Reservation.com
        </div>

        <div className="flex gap-2">
          {/* <button
            className="md:p-2 p-1 md:px-10 px-2 rounded-full font-medium text-white border transition-all duration-400 ease-in border-white hover:text-background hover:bg-white"
            onClick={() => {
              navigate("/sign-in");
            }}
          >
            Register
          </button>
          <button
            className="md:p-2 p-1 md:px-10 px-2 rounded-full font-medium text-white border transition-all duration-400 ease-in border-white hover:text-background hover:bg-white"
            onClick={() => {
              navigate("/sign-in");
            }}
          >
            Sign in
          </button> */}
        </div>
      </div>
      {/* <div className="flex gap-2 mt-[5%]">
        <button className="py-2 px-4 border items-center flex gap-2 border-white rounded-full">
          <Home />
          Stay
        </button>
       
      </div> */}
      <div className="mt-[5%]">
        <h1 className="md:text-[50px] text-[30px] font-bold">
          Find Your Next Stay
        </h1>
        <h6 className="text-lg">
          Search low prices on hotels, homes and much more...
        </h6>
      </div>
    </div>
  );
};

export default HomeJumbotron;
