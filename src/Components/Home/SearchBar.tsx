import { useNavigate } from "react-router-dom";
import LocationInput from "../LocationInput";
import { useEffect, useState, useRef, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { getLocationsByNameAction } from "../../redux/actions/locations.actions";
import { ReducersType } from "../../redux/store";
import { useSelector } from "react-redux";
import { reservationsResponseType } from "../../redux/reducers/hotels.reducer";

const SearchBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialRef = useRef<HTMLDivElement>(null);
  const locationModalRef = initialRef;
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationSearchTerm, setLocationSearchTerm] = useState("");
  const [data, setData] = useState([]);

  const allLocations = useSelector<ReducersType>(
    (state: ReducersType) => state?.locations
  ) as reservationsResponseType;
  const selectLocationHandler = (location: {
    dest_type: string;
    dest_id: string;
    label: string;
  }) => {
    setLocationSearchTerm(location.label);
    setShowLocationModal(false);
  };

  const locationModalFocusHandler = () => {
    setShowLocationModal(true);
  };
  const locationModalChangeHandler = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;

    setLocationSearchTerm(target.value);
    setShowLocationModal(true);
  };
  useEffect(() => {
    setData(Object.values(allLocations.serverResponse as []));
  }, [allLocations.serverResponse]);
  useEffect(() => {
    const checkIfClickedOutside = (e: Event) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        showLocationModal &&
        locationModalRef.current &&
        !locationModalRef.current.contains(e.target as HTMLInputElement)
      ) {
        setShowLocationModal(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showLocationModal, locationModalRef]);
  useEffect(() => {
    if (locationSearchTerm === "") {
      return;
    }
    const timer = setTimeout(() => {
      dispatch(getLocationsByNameAction(locationSearchTerm) as never);
    }, 500);
    return () => clearTimeout(timer);
  }, [locationSearchTerm, dispatch]);


  return (
    <div className=" text-background absolute left-0 top-[330px] md:px-[10%] px-[5%] w-[100%]  h-[60px] ">
      <div className=" flex md:flex-nowrap flex-wrap h-full">
        <LocationInput
          loading={allLocations.loading}
          selectLocationHandler={selectLocationHandler}
          locationSearchTerm={locationSearchTerm}
          locations={data}
          locationModalFocusHandler={locationModalFocusHandler}
          locationModalRef={locationModalRef}
          showLocationModal={showLocationModal}
          locationModalChangeHandler={locationModalChangeHandler}
        />
        <input
          type="text"
          className=" border-4 border-lightbackground h-full md:w-[25%] w-[100%] outline-none"
        />
        <input
          type="text"
          className=" border-4 border-lightbackground h-full outline-none md:w-[25%] w-[100%]"
        />
        <button
          onClick={() => {
            navigate("/searchresults");
          }}
          className="md:w-[25%] w-[100%] border-4 border-lightbackground h-full bg-background hover:bg-lightbackground text-white font-bold"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
