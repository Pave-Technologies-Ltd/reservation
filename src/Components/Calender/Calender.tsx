import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, DayValue, utils } from '@hassanmojab/react-modern-calendar-datepicker';

type calenderType = {
  selectedDayRange: selectedDateRangeType;

  setSelectedDayRange: (e: { from: null; to: null }) => void;
};

type selectedDateRangeType = {
  from: DayValue;
  to: DayValue;
};

const Calender = ({ selectedDayRange, setSelectedDayRange }: calenderType) => {
  return (
    <Calendar
      value={selectedDayRange}
      onChange={setSelectedDayRange}
      shouldHighlightWeekends={true}
        minimumDate={utils('en').getToday()}
    />
  );
};

export default Calender;
