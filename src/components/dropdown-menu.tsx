import React from "react";
import { Select } from "antd";

interface SelectMenu {
  placeholder: string;
  items: {
    label: string;
    value: string;
  }[];
  setState: React.Dispatch<React.SetStateAction<string>>;
  defaultValue: string;
  category: string;
}

const SelectComponent: React.FC<SelectMenu> = ({ placeholder, items, setState, defaultValue, category }) => {
  const handleChange = (value: string) => {
    setState(value);
  };
  return (
    <div className="relative">
      <Select
        options={items}
        className="w-full mb-3"
        placeholder={placeholder}
        onChange={handleChange}
        value={defaultValue !== "" ? defaultValue : undefined}
        disabled={category === "REBOOK_APPOINTMENT" && placeholder === "Select a service" ? true : false}
      />
    </div>
  );
};

export default SelectComponent;
