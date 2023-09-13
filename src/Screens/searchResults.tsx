import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { ReducersType } from "../redux/store";
import { reservationsResponseType } from "../redux/reducers/hotels.reducer";
import { useState, useEffect } from "react";
import { getHotelsAction } from "../redux/actions/hotels.actions";
import Property from "../Components/Properties/Property";
import Spinner from "../utilities/Spinner";

import PropertyType from "../Types/Property.types";

// import { Booking_API } from "../utilities/api";
import TopBar from "../Components/TopBar";
import Checkbox from "../Components/Checkbox";
// import Pagination from "../Components/Pagination";
// import SearchBar from "../Components/Home/SearchBar";

const SearchResults = () => {
  // const navigate = useNavigate();
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

  const [properties, setProperties] = useState<PropertyType[]>([]);

  type serverResponseType = {
    [key: string]: unknown;
  };
  const hotelsResponse = useSelector<ReducersType>(
    (state: ReducersType) => state?.hotels
  ) as reservationsResponseType;

  const serverResponse = hotelsResponse.serverResponse as serverResponseType;

  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  useEffect(() => {
    const effectFunction = async () => {
      if (typeof serverResponse?.result === "undefined") {
        return;
      } else {
        // const finalProperties: PropertyType[] = [];
        const initialProperties = Object.values(
          serverResponse?.result as PropertyType[]
        );

        // const loopFunction = async () => {
        //   for (const hotel of initialProperties) {
        //     const config = {
        //       params: {
        //         hotel_id: hotel.hotel_id,
        //         locale: "en-gb",
        //       },
        //       headers: {
        //         "X-RapidAPI-Key":
        //           "58384481e7mshce8cc708fd6414ap1f6838jsna9f2faf27f7c",
        //         "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
        //       },
        //     };

        //     const { data } = await Booking_API.get(
        //       `/hotels/description`,
        //       config
        //     );

        //     const hotelWithDescription = {
        //       ...hotel,
        //      description: data.description,
        //     };

        //     finalProperties.push(hotelWithDescription);
        //   }
        //   return finalProperties;
        // };

        // const propertiesWithDescription = await loopFunction();

        // setProperties(propertiesWithDescription);
        setProperties(initialProperties);
      }
    };
    effectFunction();
  }, [serverResponse?.result]);

  useEffect(() => {
    setProperties([]);

    // if (
    //   cityName ||
    //   adult ||
    //   dest_id ||
    //   dest_type ||
    //   room ||
    //   children_number === undefined
    // ) {
    //   return;
    // }
    // if(checkin_date || checkout_date === 'undefined-undefined-undefined'){
    //   return
    // }

    
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

  return (
    <div className=" w-full h-full flex flex-col">
      <TopBar />

      <div className="md:px-[10%] px-[5%]  w-[100%]  gap-4 md:mt-[6%] mt-[60%] flex flex-col ">
        <div className="  w-[100%] h-full md:gap-4 gap-0 mt-[5%] flex">
          <div className="border md:visible invisible md:w-[20%] w-0 h-full">
            <Checkbox
              label="Hotel"
              handleChange={handleChange}
              isChecked={isChecked}
            />
          </div>

          <div className="flex flex-col w-[100%]">
            {hotelsResponse.loading ? (
              <div className=" flex items-center w-full justify-center">
                <Spinner size="large" />
              </div>
            ) : (
              <div className="border  w-[100%] h-full md:p-4 p-0">
                <div className="">
                  {hotelsResponse.loading ? (
                    ""
                  ) : (
                    <h1 className="font-bold">
                      {`${cityName.toUpperCase()}: ${
                        serverResponse?.total_count_with_filters
                      }`}{" "}
                      properties found
                    </h1>
                  )}
                </div>

                {properties.map((property) => (
                  <div key={property.hotel_id}>
                    <Property property={property} />
                  </div>
                ))}

                <div>
                  {hotelsResponse.loading ? (
                    ""
                  ) : (
                    <h1 className="font-normal">
                      {`${cityName.toUpperCase()}: ${
                        serverResponse?.total_count_with_filters
                      }`}{" "}
                      properties found
                    </h1>
                  )}
                </div>
              </div>
            )}
            {/* <Pagination /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
