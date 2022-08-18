import * as React from "react";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import endOfWeek from "date-fns/endOfWeek";
import isSameDay from "date-fns/isSameDay";
import isWithinInterval from "date-fns/isWithinInterval";
import startOfWeek from "date-fns/startOfWeek";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Theme from "constants/Theme";

type CustomPickerDayProps = PickersDayProps<Date> & {
  dayIsBetween: boolean;
  isFirstDay: boolean;
  isLastDay: boolean;
};

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== "dayIsBetween" && prop !== "isFirstDay" && prop !== "isLastDay",
})<CustomPickerDayProps>(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: Theme.colorPalette.ttcYellow,
    color: theme.palette.common.black,
    "&:hover, &:focus": {
      backgroundColor: Theme.colorPalette.black,
      color: Theme.colorPalette.ttcYellow,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  ...(isLastDay && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
})) as React.ComponentType<CustomPickerDayProps>;

export default function CustomDay({
  value,
  handleChange,
  mostRecentWeek,
}: {
  value: Date | null;
  mostRecentWeek: Date | null;
  handleChange: (Date: Date | null) => void;
}) {
  // const [value, setValue] = React.useState<Date | null>(new Date());

  const renderWeekPickerDay = (
    date: Date,
    selectedDates: Array<Date | null>,
    pickersDayProps: PickersDayProps<Date>
  ) => {
    if (!value) {
      return <PickersDay {...pickersDayProps} />;
    }

    const start = startOfWeek(value, { weekStartsOn: 5 });
    const end = endOfWeek(value, { weekStartsOn: 5 });

    const dayIsBetween = isWithinInterval(date, { start, end });
    const isFirstDay = isSameDay(date, start);
    const isLastDay = isSameDay(date, end);

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        // displayStaticWrapperAs="desktop"
        // label="Week picker"
        className="datepicker"
        value={value}
        onChange={(newValue) => {
          handleChange(newValue);
        }}
        renderDay={renderWeekPickerDay}
        renderInput={(params) => (
          <TextField className="date-text" {...params} />
        )}
        maxDate={endOfWeek(mostRecentWeek!, { weekStartsOn: 5 })}
        // inputFormat="'Week of' MMM d"
        // mask=""
      />
    </LocalizationProvider>
  );
}
