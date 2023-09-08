import { useNavigate } from "react-router-dom";
import PropertyType from "../../Types/Property.types";
import CapitalizeFirstLetter from "../../utilities/CapitalizeFirstLetter";
import truncateString from "../../utilities/truncateString";
import Check from "../../assets/Check";

interface PropertyComponentType {
  property: PropertyType;
}

const Property = ({ property }: PropertyComponentType) => {
  const navigate = useNavigate();
  return (
    <div className="h-[250px]  min-h-0 w-full border rounded-md p-4 flex mb-4 gap-4">
      <div
        className=" w-[40%] h-full bg-cover bg-center rounded-md"
        style={{
          backgroundImage: `url(${property.max_photo_url})`,
        }}
      ></div>
      <div className=" w-[60%] h-full flex flex-col">
        <div className="flex md:flex-row  flex-col h-full gap-4  w-full">
          <div className="flex flex-col gap-2  md:h-[100%] h-[50%]  md:w-[50%] w-[100%]">
            {property.hotel_name != undefined && (
              <h1 className="text-sm text-background font-bold">
                {CapitalizeFirstLetter(property.hotel_name)}
              </h1>
            )}

            {property.description != undefined && (
              <p className="text-xs ">{truncateString(property.description)}</p>
            )}
            <div className=" border-l  pl-2">
              {property.is_free_cancellable === 1 && (
                <div className="gap-2 flex items-center">
                  <Check />
                  <p className="text-xs">Free cancellation</p>
                </div>
              )}
              {property.is_no_prepayment_block === 1 && (
                <div className="gap-2 flex items-center">
                  <Check />
                  <p className="text-xs">No prepayment needed</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2  md:h-[100%] h-[50%] md:w-[50%] w-[100%] ">
            <div className="flex gap-2 w-full justify-between ">
              <div className="flex flex-col">
                <p>{property.review_score_word}</p>
                <p className="text-xs">{`${property.review_nr} reviews`}</p>
              </div>
              <div className="text-white font-bold bg-background p-2 flex items-center justify-center rounded-md h-[30px]">
                {property.review_score}
              </div>
            </div>
            <div>
              <button
                onClick={() => {
                  navigate(`/property/${property.hotel_id}`);
                }}
                className="text-white font-bold bg-background p-2 hover:bg-lightbackground flex items-center justify-center w-[100%]"
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
