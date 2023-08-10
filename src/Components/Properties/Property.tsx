import PropertyType from "../../Types/Property.types";

interface PropertyComponentType {
  property :PropertyType
}

const Property = ({property}: PropertyComponentType) => {
  return (
    <div className="h-[200px] w-full border p-4 flex mb-4">
      <div
        className="border w-[40%] h-full bg-cover bg-center rounded-md"
        style={{
          backgroundImage: `url(${property.max_photo_url})`,
        }}
      >
        {/* <img className="w-full h-full" src={property.max_photo_url} alt="" /> */}
      </div>
      <div className="border w-[60%] h-full">
        <h1>{property.hotel_name}</h1>
      </div>
    </div>
  );
};

export default Property;
