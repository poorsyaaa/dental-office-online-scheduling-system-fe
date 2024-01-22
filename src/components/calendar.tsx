import React from "react";

import { DatePicker, Space } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import { isSameDay, parseISO, isBefore, startOfDay } from "date-fns";

interface CalendarAppProps {
  unAvailableDate: string[];
  setState: React.Dispatch<React.SetStateAction<string>>;
  defaultValue: string;
}

const CalendarAppointment: React.FC<CalendarAppProps> = ({ unAvailableDate, setState, defaultValue }) => {
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setState(dateString);
  };

  return (
    <Space direction="vertical">
      <DatePicker
        allowClear
        format="YYYY-MM-DD"
        defaultValue={defaultValue ? dayjs(defaultValue) : undefined}
        onChange={onChange}
        disabledDate={(current) => unAvailableDate.some((date) => isSameDay(parseISO(date), parseISO(current.format("YYYY-MM-DD")))) || isBefore(current.toDate(), startOfDay(new Date()))}
      />
    </Space>
  );
};

export default CalendarAppointment;
