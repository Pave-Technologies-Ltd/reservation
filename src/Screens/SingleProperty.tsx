import { useDispatch } from "react-redux";
import Carousel from "../Components/Carousel";
import TopBar from "../Components/TopBar";
import { useParams } from "react-router-dom";
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

const SingleProperty = () => {
  const dispatch = useDispatch();

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

      <div className="flex flex-col">
        <div className="    p-4 md:px-[10%] px-[5%] w-full mx-auto">
          {singleHotelResponse.loading ? (
            <SkeletonLoader />
          ) : (
            <div className="">
              <h1 className="font-bold">{singlePropertyData.name}</h1>
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
            <div className=" ">
              <Carousel photos={photos} />
            </div>
          )}

          {hotelDescriptionResponse.loading ? (
            <SkeletonLoader />
          ) : (
            <>
              {hotelDescription.description != undefined && (
                <p className="mt-4">{`${hotelDescription.description}`}</p>
              )}
            </>
          )}

          <div>
            <h1>Most popular facilities</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProperty;
