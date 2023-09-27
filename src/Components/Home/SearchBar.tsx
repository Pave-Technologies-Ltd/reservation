import LocationInput from "../LocationInput";
import { useEffect, useState, useRef, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { getLocationsByNameAction } from "../../redux/actions/locations.actions";
import { ReducersType } from "../../redux/store";
import { useSelector } from "react-redux";
import { reservationsResponseType } from "../../redux/reducers/hotels.reducer";

import { DayValue } from "@hassanmojab/react-modern-calendar-datepicker";
import CalenderInput from "../CalenderInput";
import UserInput from "../UserInput";
import { useSearchParams } from "react-router-dom";

interface SearchBarType {
  searchButtonHandler: (e: {
    room: string;
    adult: string;
    city_name: string | undefined;
    checkin_date: string;
    checkout_date: string;
    children_number: string;
    dest_type: string | undefined;
    dest_id: string | undefined;
  }) => void;
}

const SearchBar = ({ searchButtonHandler }: SearchBarType) => {
  const [searchParams] = useSearchParams();
  const cityName = searchParams.get("CN") as string;
  const dispatch = useDispatch();

  type selectedDateRangeType = {
    from: DayValue;
    to: DayValue;
  };
  const initialRef = useRef<HTMLDivElement>(null);
  type userInputActionType = "increase" | "decrease";
  type locationDetailType = {
    dest_type: string;
    dest_id: string;
    label: string;
    city_name: string;
  };
  const locationModalRef = initialRef;
  const calenderModalRef = initialRef;
  const UserInputModalRef = initialRef;
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showCalender, setShowcalender] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [locationSearchTerm, setLocationSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [data, setData] = useState([]);
  const [adult, setAdult] = useState(1);
  const [locationDetails, setLocationDetails] =
    useState<locationDetailType | null>(null);
  const [children, setChildren] = useState(0);
  const [room, setRoom] = useState(1);
  // const [day, setDay] = useState<DayValue>(null);
  const [selectedDayRange, setSelectedDayRange] =
    useState<selectedDateRangeType>({
      from: null,
      to: null,
    });
  const allLocations = useSelector<ReducersType>(
    (state: ReducersType) => state?.locations
  ) as reservationsResponseType;
  const checkInDate = `${selectedDayRange?.from?.year}-${selectedDayRange?.from?.month}-${selectedDayRange?.from?.day}`;
  const checkOutDate = `${selectedDayRange?.to?.year}-${selectedDayRange?.to?.month}-${selectedDayRange?.to?.day}`;
  const UserInputHandler = (action: userInputActionType, type: string) => {
    // Adult
    if (action === "increase" && type === "adult") {
      setAdult(adult + 1);
    }
    if (action === "decrease" && type === "adult") {
      if (adult === 1) {
        return;
      }
      setAdult(adult - 1);
    }

    // Room
    if (action === "increase" && type === "room") {
      setRoom(room + 1);
    }
    if (action === "decrease" && type === "room") {
      if (room === 1) {
        return;
      }
      setRoom(room - 1);
    }

    //  Children

    if (action === "increase" && type === "children") {
      setChildren(children + 1);
    }
    if (action === "decrease" && type === "children") {
      if (children === 0) {
        return;
      }
      setChildren(children - 1);
    }
  };

  const selectLocationHandler = (location: locationDetailType) => {
    setLocationDetails(location);

    setSelectedLocation(location.label);
    // setLocationSearchTerm();
    setShowLocationModal(false);
  };

  const showUserModalHandler = () => {
    setShowUserModal(!showUserModal);
  };
  const calenderClickHandler = () => {
    setShowcalender(true);
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
    if (allLocations?.serverResponse) {
      setData(() => [...Object.values(allLocations?.serverResponse as [])]);
    } else {
      setData(() => []);
    }
  }, [allLocations?.serverResponse]);

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

      if (
        showUserModal &&
        UserInputModalRef.current &&
        !UserInputModalRef.current.contains(e.target as HTMLInputElement)
      ) {
        setShowUserModal(false);
      }

      if (
        showCalender &&
        calenderModalRef.current &&
        !calenderModalRef.current.contains(e.target as HTMLInputElement)
      ) {
        setShowcalender(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [
    showLocationModal,
    locationModalRef,
    showCalender,
    calenderModalRef,
    showUserModal,
    UserInputModalRef,
  ]);

  useEffect(() => {
    if (locationSearchTerm === "") {
      return;
    }
    const timer = setTimeout(() => {
      dispatch(getLocationsByNameAction(locationSearchTerm) as never);
    }, 500);
    return () => clearTimeout(timer);
  }, [locationSearchTerm, dispatch]);
  // console.log(`${day?.year}-${day?.month}-${day?.day}`)
  // console.log(allLocations.serverResponse);

  return (
    <div className=" text-background absolute left-0 top-[120px] md:px-[10%] px-[5%] w-[100%]  h-[60px] ">
      <div className=" flex lg:flex-nowrap flex-wrap h-full">
        <LocationInput
          loading={allLocations.loading}
          selectLocationHandler={selectLocationHandler}
          locationSearchTerm={locationSearchTerm}
          locations={data}
          selectedLocation={selectedLocation || cityName}
          locationModalFocusHandler={locationModalFocusHandler}
          locationModalRef={locationModalRef}
          showLocationModal={showLocationModal}
          locationModalChangeHandler={locationModalChangeHandler}
        />
        <CalenderInput
          calenderClickHandler={calenderClickHandler}
          calenderModalRef={calenderModalRef}
          showCalender={showCalender}
          selectedDayRange={selectedDayRange}
          setSelectedDayRange={setSelectedDayRange}
        />
        <UserInput
          showUserModalHandler={showUserModalHandler}
          room={room}
          adult={adult}
          children={children}
          showUserModal={showUserModal}
          UserInputModalRef={UserInputModalRef}
          UserInputHandler={UserInputHandler}
        />

        <button
          onClick={searchButtonHandler.bind(null, {
            room: room.toString(),
            adult: adult.toString(),
            dest_type: locationDetails?.dest_type,
            checkin_date: checkInDate,
            checkout_date: checkOutDate,
            children_number: children.toString(),
            dest_id: locationDetails?.dest_id,
            city_name: locationDetails?.city_name,
          })}
          // onClick={()=>{alert(checkInDate)
          // }}
          className="lg:w-[10%] w-[100%] border-4 border-lightbackground h-full bg-background hover:bg-lightbackground text-white font-bold"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
