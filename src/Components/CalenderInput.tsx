import { DayValue } from "@hassanmojab/react-modern-calendar-datepicker";
import CalenderIcon from "../assets/CalenderIcon";
import Calender from "./Calender/Calender";
import { RefObject } from "react";
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
  calenderModalRef
}: CalenderInputType) => {
  return (
    <div className="relative md:w-[25%] w-[100%] h-full">
      {" "}
      <div className="relative w-[100%] h-full flex p-2 bg-white border-4  border-lightbackground items-center">
        <div className="absolute mx-1">
          <CalenderIcon />
        </div>

        <input
          onClick={calenderClickHandler}
          type="text"
          className=" cursor-pointer placeholder:text-[#262626] placeholder:font-medium font-medium  pl-8 py-2  h-full w-full outline-none text-sm text-[#262626]"
          readOnly
          placeholder="Check-in date - check-out date"
        />
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
