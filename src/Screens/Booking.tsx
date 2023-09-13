import { useParams } from "react-router-dom";
import Input from "../Components/Input";
import Textarea from "../Components/Textarea";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSingleHotelAction } from "../redux/actions/singleHotel.actions";
import { reservationsResponseType } from "../redux/reducers/hotels.reducer";
import { ReducersType } from "../redux/store";
import SinglePropertyType from "../Types/SingleProperty.types";
import SkeletonLoader from "../Components/SkeletonLoader";
// import TopBar from "../Components/TopBar";
const Booking = () => {
  const dispatch = useDispatch();

  const { propertyId } = useParams();

  const singleHotelResponse = useSelector<ReducersType>(
    (state: ReducersType) => state?.singleHotel
  ) as reservationsResponseType;

  const singlePropertyData =
    singleHotelResponse.serverResponse as SinglePropertyType;

  useEffect(() => {
    dispatch(getSingleHotelAction(propertyId) as never);
  }, []);

  console.log(singleHotelResponse);
  return (
    <>
    {/* <TopBar/> */}
    <div className="flex flex-col  border h-full md:px-[10%] px-[5%] bg-[]">
      <div className=" p-4 w-full flex gap-4 ">
        <div className="flex gap-2 items-center w-[35%] ">
          <div className="bg-[#6f00e7] rounded-full md:h-12 h-6 w-6 md:w-12 flex justify-center items-center">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="4"
              stroke="currentColor"
              className="md:w-6 w-3 md:h-6 h-3 stroke-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
          <span className="md:text-base text-xs font-bold">Your Selection</span>
          {/* <div className="border w-[40%]"></div> */}
        </div>
        <div className="flex gap-2 items-center w-[35%] ">
          <div className="bg-[#6f00e7] rounded-full md:h-12 h-6 w-6 md:w-12 flex justify-center items-center ">
            <span className="md:w-6 w-3 md:h-6 h-3 text-white flex justify-center items-center">
              2
            </span>
          </div>
          <span className="md:text-base text-xs font-bold">Your details</span>
          {/* <div className="border w-[40%]"></div> */}
        </div>
        <div className="flex gap-2 items-center  w-[30%] justify-end">
          <div className=" border-2 rounded-full md:h-12 h-6 w-6 md:w-12 flex justify-center items-center text-white">
            <span className="md:w-6 w-3 md:h-6 h-3 text-black flex justify-center items-center">
              3
            </span>
          </div>
          <span className="md:text-base text-xs font-bold">Final Step</span>
        </div>
      </div>
      <div className="flex md:flex-nowrap flex-wrap  w-full gap-4">
        <div className=" md:w-[30%] w-[100%] h-full">
          {singleHotelResponse.loading ? (
            <SkeletonLoader />
          ) : (
            <div className="border h-full w-full p-4 rounded-md">
              <h1 className="font-bold text-sm">{singlePropertyData.name}</h1>
              <p className="mt-2 text-xs">{singlePropertyData.address}</p>
              <div className="mt-2 flex w-full gap-2 items-center">
                <div className="text-white  bg-background p-1 flex items-center justify-center rounded-md ">
                  {singlePropertyData.review_score}
                </div>
                <span className="text-sm">{singlePropertyData.review_score_word} .</span>
                <span className="text-sm">{singlePropertyData.review_nr} reviews</span>
              </div>
            </div>
          )}
        </div>
        <div className=" md:w-[70%] w-[100%] h-full">
          {/* First Div */}
          <div className="border h-full p-4 rounded-md">
            <h1 className="font-bold">Enter your details</h1>
            <div className="border flex gap-4 mt-2 bg-[#f5f5f5] rounded-md p-4 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
              <h4 className="text-sm">
                Almost done! Just fill in the required info
              </h4>
            </div>
            <h4 className="text-sm font-bold mt-4">
              Are you travelling for work?
            </h4>

            {/* Radio Components */}

            <ul className="w-full mt-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg flex">
              <li className="w-full  border-gray-200 rounded-t-lg ">
                <div className="flex items-center pl-3">
                  <input
                    id="list-radio-license"
                    type="radio"
                    value=""
                    name="list-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Yes
                  </label>
                </div>
              </li>
              <li className="w-full  border-gray-200 rounded-t-lg ">
                <div className="flex items-center pl-3">
                  <input
                    id="list-radio-license"
                    type="radio"
                    value=""
                    name="list-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    No
                  </label>
                </div>
              </li>
            </ul>

            {/* Input Elements */}

            <div className="flex md:flex-nowrap flex-wrap mt-4 md:gap-12 gap-0">
              <div className="md:w-[50%] w-[100%]">
                <Input fieldLabel="Firstname" type="text" />
              </div>
              <div className="md:w-[50%] w-[100%]">
                <Input fieldLabel="Lastname" type="text" />
              </div>
            </div>

            {/* Email Element */}
            <div className="mt-4">
              <div className="md:w-[60%] w-[100%]">
                <Input fieldLabel="Email address" type="email" />
              </div>
            </div>
          </div>

          {/* Second Div */}
          <div className="border h-full p-4 mt-4 rounded-md">
            <h1 className="text-sm font-bold">Special requests</h1>
            <p className="text-xs mt-2">
              Although special requests cannot always be fulfilled, the
              accommodation will make every effort to do so. A specific request
              can always be made once your reservation is made!
            </p>
            <div className="mt-4 ">
              <Textarea />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Booking;
