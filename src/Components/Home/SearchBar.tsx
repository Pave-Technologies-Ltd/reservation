import { useNavigate } from "react-router-dom";
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

const SearchBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  type selectedDateRangeType = {
    from: DayValue;
    to: DayValue;
  };
  const initialRef = useRef<HTMLDivElement>(null);
  type userInputActionType = "increase" | "decrease";
  const locationModalRef = initialRef;
  const calenderModalRef = initialRef;
  const UserInputModalRef = initialRef;
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showCalender, setShowcalender] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [locationSearchTerm, setLocationSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [adult, setAdult] = useState(1);
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

  const selectLocationHandler = (location: {
    dest_type: string;
    dest_id: string;
    label: string;
  }) => {
    setLocationSearchTerm(location.label);
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
  //  console.log(selectedDayRange);

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
