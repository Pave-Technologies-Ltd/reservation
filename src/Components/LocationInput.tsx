import { ChangeEvent, RefObject } from "react";
import { Home, Location, Plane } from "../assets/svg";
import Spinner from "../utilities/Spinner";

interface LocationInputType {
  loading: boolean;
  locationModalRef: RefObject<HTMLDivElement>;
  showLocationModal: boolean;
  locationModalFocusHandler: () => void;
  locationModalChangeHandler: (e: ChangeEvent) => void;
  locations: never[];
  locationSearchTerm: string;
  selectLocationHandler: (e: {
    dest_type: string;
    dest_id: string;
    label: string;
  }) => void;
}

const LocationInput = ({
  loading,
  locationSearchTerm,
  locationModalRef,
  showLocationModal,
  locationModalFocusHandler,
  locationModalChangeHandler,
  locations,
  selectLocationHandler,
}: LocationInputType) => {
   
  return (
    <div className="relative md:w-[25%] w-[100%] h-full">
      <div className="relative  w-[100%] h-full border-4 border-lightbackground p-2  bg-white flex items-center">
        <div className="absolute mx-1">
          <Home stroke="#6f00e7" />
        </div>
        {/* <img className=" w-6 h-6 absolute fill-lightbackground" src={Home} alt="" /> */}
        <input
          value={locationSearchTerm}
          spellCheck={false}
          onChange={locationModalChangeHandler}
          onFocus={locationModalFocusHandler}
          type="text"
          placeholder="Where are you going to?"
          className=" focus:placeholder:text-[#b5b5b5] placeholder:font-medium font-medium  placeholder:text-sm placeholder:text-[#262626] pl-6 h-full w-full py-2 sm:text-sm outline-none  text-[#262626]  focus:border-2 focus:border-[#fed772]"
        />
      </div>
      {showLocationModal && (
        <div
          className={` mt-1 bg-white shadow-md ${
            loading ? "w-[100%]" : "w-[400px]"
          }  flex flex-col items-center justify-center border absolute`}
          ref={locationModalRef}
        >
          {loading ? (
            <Spinner size="medium" />
          ) : (
            <div>
              {locations?.map(
                (
                  location: {
                    label: string;
                    name: string;
                    dest_type: string;
                    dest_id: string;
                  },
                  index
                ) => (
                  <div
                    onClick={selectLocationHandler.bind(null, {
                      dest_type: location.dest_type,
                      dest_id: location.dest_id,
                      label: location.label,
                    })}
                    key={index}
                    className="border px-2 gap-2 items-center flex h-[50px] w-[100%] hover:bg-[#f0f0f0] cursor-pointer"
                  >
                    <div>
                      {location.dest_type === "airport" ? (
                        <Plane />
                      ) : (
                        <Location />
                      )}
                    </div>
                    <div className="flex  justify-center flex-col ">
                      <p className="font-bold text-[14px]">{location.name}</p>
                      <p className="text-xs text-slate-500">{location.label}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
