import PropertyType from "../../Types/Property.types";
import truncateString from "../../utilities/truncateString";

interface PropertyComponentType {
  property: PropertyType;
}

const Property = ({ property }: PropertyComponentType) => {
  return (
    <div className="h-[200px] w-full border p-4 flex mb-4 gap-4">
      <div
        className="border w-[40%] h-full bg-cover bg-center rounded-md"
        style={{
          backgroundImage: `url(${property.max_photo_url})`,
        }}
      ></div>
      <div className="border w-[60%] h-full flex flex-col">
        <div className="flex  justify-between gap-4 ">
          <div className="flex flex-col gap-2">
            <h1 className=" text-background font-bold">
              {property.hotel_name}
            </h1>

            <p className="text-xs ">
              {truncateString(property.description as string)}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex">
              <div className="flex flex-col">
                <p>{property.review_score_word}</p>
                <p className="text-xs">{`${property.review_nr} reviews`}</p>
              </div>
              <div className="text-white font-bold bg-background p-2 flex items-center justify-center rounded-md h-[30px]">
                {property.review_score}
              </div>
            </div>
            <div>
              <button className="text-white font-bold bg-background p-2 flex items-center justify-center w-[100%]">
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
