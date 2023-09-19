import { useDispatch } from "react-redux";
import Carousel from "../Components/Carousel";
import TopBar from "../Components/TopBar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getHotelPhotosAction } from "../redux/actions/hotelsPhotos.actions";
import { ReducersType } from "../redux/store";
import { useSelector } from "react-redux";
import { reservationsResponseType } from "../redux/reducers/hotels.reducer";
import PropertyPhotosType from "../Types/Property.photos.types";
import Spinner from "../utilities/Spinner";
import { getSingleHotelAction } from "../redux/actions/singleHotel.actions";
import SinglePropertyType from "../Types/SingleProperty.types";
import SkeletonLoader from "../Components/SkeletonLoader";
import Location from "../assets/Location";
import { getHotelDescriptionAction } from "../redux/actions/hotelsdescription";
import CapitalizeFirstLetter from "../utilities/CapitalizeFirstLetter";

const SingleProperty = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { propertyId } = useParams();

  const hotelPhotosResponse = useSelector<ReducersType>(
    (state: ReducersType) => state?.hotelPhotos
  ) as reservationsResponseType;

  const hotelDescriptionResponse = useSelector<ReducersType>(
    (state: ReducersType) => state?.hotelDescription
  ) as reservationsResponseType;
  type serverHotelDescriptionType = {
    [key: string]: string;
  };

  const singleHotelResponse = useSelector<ReducersType>(
    (state: ReducersType) => state?.singleHotel
  ) as reservationsResponseType;

  const photos = Object.values(
    hotelPhotosResponse.serverResponse as PropertyPhotosType[]
  );
  const singlePropertyData =
    singleHotelResponse.serverResponse as SinglePropertyType;

  const hotelDescription =
    hotelDescriptionResponse.serverResponse as serverHotelDescriptionType;
  useEffect(() => {
    dispatch(getHotelPhotosAction(propertyId) as never);
    dispatch(getSingleHotelAction(propertyId) as never);
    dispatch(getHotelDescriptionAction(propertyId) as never);
  }, []);
  // console.log(singleHotelResponse);
  return (
    <div className="">
      <TopBar />

      <div className="flex flex-col md:mt-[5%] mt-[60%] bg-[]">
        <div className="    p-4 md:px-[10%] px-[5%] w-full mx-auto ">
          {singleHotelResponse.loading ? (
            <SkeletonLoader />
          ) : (
            <div className="border rounded-md p-4">
              {singlePropertyData.name != undefined && (
                <h1 className="font-bold">
                  {CapitalizeFirstLetter(singlePropertyData.name)}
                </h1>
              )}
              <div className="flex gap-2 items-center">
                <Location />
                <p className="text-xs">{singlePropertyData.address}</p>
              </div>
            </div>
          )}
        </div>
        <div className="md:px-[10%] px-[5%]">
          {hotelPhotosResponse.loading ? (
            <div className=" flex items-center w-full justify-center">
              <Spinner size="large" />
            </div>
          ) : (
            <div className=" border p-4 relative rounded-md">
              <Carousel photos={photos} />
              {/* <ImageGallery items={photos} /> */}
            </div>
          )}

          {hotelDescriptionResponse.loading ? (
            <SkeletonLoader />
          ) : (
            <>
              {hotelDescription.description != undefined && (
                <div className="rounded-md p-4 border mt-4">
                  <div className="mt-4 bg-[#e4f4ff] p-4 leading-8">{`${hotelDescription.description}`}</div>
                  <div className="w-full mt-4">
                    {/* <h1>Most popular facilities</h1> */}
                    <button
                      onClick={() => {
                        navigate(`/property/booking/${propertyId}`);
                      }}
                      className="w-[100px] p-4 bg-[#fed772]"
                    >
                      Reserve
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProperty;
