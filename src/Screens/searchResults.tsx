import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ReducersType } from "../redux/store";
import { reservationsResponseType } from "../redux/reducers/hotels.reducer";
import { useState, useEffect } from "react";
import { getHotelsAction } from "../redux/actions/hotels.actions";
import Property from "../Components/Properties/Property";
import Spinner from "../utilities/Spinner";

const SearchResults = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const room = searchParams.get("room") as string;
  const adult = searchParams.get("adult") as string;
  const checkin_date = searchParams.get("checkin_date") as string;
  const checkout_date = searchParams.get("checkout_date") as string;
  const dest_type = searchParams.get("dest_type") as string;
  const dest_id = searchParams.get("dest_id") as string;
  const children_number = searchParams.get("children_number") as string;
  const cityName = searchParams.get("CN") as string;

  type serverResponseType = {
    [key: string]: unknown;
  };
  const hotelsResponse = useSelector<ReducersType>(
    (state: ReducersType) => state?.hotels
  ) as reservationsResponseType;

  const serverResponse = hotelsResponse.serverResponse as serverResponseType;
  const [properties, setProperties] = useState([]);
  // console.log(allHotels);
  useEffect(() => {
    if (typeof serverResponse?.result === "undefined") {
      return;
    } else {
      setProperties(Object.values(serverResponse?.result as []));
    }
  }, [serverResponse?.result]);

  useEffect(() => {
    dispatch(
      getHotelsAction(
        room,
        adult,
        checkin_date,
        checkout_date,
        dest_type,
        dest_id,
        children_number == "0" ? "1" : children_number
      ) as never
    );
  }, []);

  // console.log(serverResponse)

  //   console.log(properties);
  //  console.log(typeof properties);

  // useEffect(() => {
  //   if (typeof properties === "undefined") {
  //     return;
  //   } else {
  //     Object.entries(properties).forEach(([key,value]) => {
  //       setProperties([...properties,value])
  //     });
  //   }
  // }, [properties]);

  console.log(properties);
  return (
    <div className=" w-full h-full flex flex-col">
      <div
        className="bg-background md:px-[10%] px-[5%] flex items-center h-[70px] cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <div className="font-bold text-3xl text-white ">Reservation.com</div>
      </div>

      <div className="md:px-[10%] px-[5%] border w-[100%]  gap-4 mt-[5%] flex flex-col ">
        <div className=" border w-[100%] h-full gap-4 mt-[5%] flex">
          <div className="border w-[30%] h-full">Filter</div>
          {hotelsResponse.loading ? (
            <div className="border flex items-center w-full justify-center">
              <Spinner size="large" />
            </div>
          ) : (
            <div className="border w-[100%] h-full p-4">
              <div>
                {hotelsResponse.loading ?"":(


                <h1 className="font-bold">
                  {`${cityName.toUpperCase()}: ${serverResponse?.count}`}{" "}
                  properties found
                </h1>
                )}
              </div>

              {properties.map((property, index) => (
                <div key={index}>
                  <Property property={property} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
