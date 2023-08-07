import { DayValue } from "@hassanmojab/react-modern-calendar-datepicker";
import CalenderIcon from "../assets/CalenderIcon";
import Calender from "./Calender/Calender";
import { RefObject } from "react";
import getMonth from "../utilities/getMonth";
interface CalenderInputType {
  showCalender: boolean;
  selectedDayRange: selectedDateRangeType;
  calenderModalRef: RefObject<HTMLDivElement>;

  setSelectedDayRange: (e: { from: null; to: null }) => void;
  calenderClickHandler: () => void;
}
type selectedDateRangeType = {
  from: DayValue;
  to: DayValue;
};

const CalenderInput = ({
  showCalender,
  selectedDayRange,
  setSelectedDayRange,
  calenderClickHandler,
  calenderModalRef,
}: CalenderInputType) => {
  
  const from = `${selectedDayRange.from?.year}-${getMonth(
    selectedDayRange.from?.month as number
  )}-${selectedDayRange.from?.day}`;
  const to = `${selectedDayRange.to?.year}-${getMonth(
    selectedDayRange.to?.month as number
  )}-${selectedDayRange.to?.day}`;

  // console.log(selectedDayRange.from);
  return (
    <div className="relative md:w-[25%] w-[100%] h-full">
      {" "}
      <div className="relative w-[100%] h-full flex p-2 bg-white border-4  border-lightbackground items-center">
        <div className="absolute mx-1">
          <CalenderIcon />
        </div>

        <div
          onClick={calenderClickHandler}
          className=" cursor-pointer  font-medium  pl-8 py-2  h-full w-full text-sm text-[#262626]"
        >{`${selectedDayRange.from === null ? "Check-in date" : from} - ${
          selectedDayRange.to === null ? "Check-out date" : to
        }`}</div>
      </div>
      {showCalender && (
        <div ref={calenderModalRef} className="mt-1 absolute shadow-md">
          <Calender
            selectedDayRange={selectedDayRange}
            setSelectedDayRange={setSelectedDayRange}
          />
        </div>
      )}
    </div>
  );
};

export default CalenderInput;
