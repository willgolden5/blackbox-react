import React, { useState, forwardRef } from "react";
import { FaChevronDown } from "react-icons/fa";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  items: { name: string; value: string }[];
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ items, ...rest }, ref) => {
    const [isActiveDropdown, setIsActiveDropdown] = useState(false);
    const [selectedItem, setSelectedItem] = useState(items[0].name); // Default to the first item

    return (
      <div className="relative w-full">
        <button
          aria-haspopup="listbox"
          aria-expanded={isActiveDropdown}
          onClick={() => setIsActiveDropdown(!isActiveDropdown)}
          className="flex w-full cursor-pointer items-center justify-between rounded-md border-2 border-black bg-[#bc95d4] px-4 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
        >
          <span className="mx-auto">{selectedItem}</span>
          <FaChevronDown
            style={{
              transform: `rotate(${isActiveDropdown ? "180deg" : "0"})`,
            }}
            className="ml-2 h-4 w-4 transition-transform ease-in-out"
          />
        </button>
        <div
          role="listbox"
          style={{
            top: "70px",
            opacity: isActiveDropdown ? "1" : "0",
            visibility: isActiveDropdown ? "visible" : "hidden",
          }}
          className="absolute left-0 z-30 w-full rounded-md border-2 border-black text-center font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          <select ref={ref} {...rest} className="hidden">
            {items.map((item, index) => (
              <option key={index} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
          {items.map((item, index) => (
            <p
              key={index}
              className="block w-full border-b-2 border-black bg-[#bc95d4] px-7 py-3 first:rounded-t-[5px] last:rounded-b-[5px] hover:bg-[#a36ec4]"
              onClick={(e) => {
                e.preventDefault();
                setSelectedItem(item.name);
                setIsActiveDropdown(false);
              }}
            >
              {item.name}
            </p>
          ))}
        </div>
      </div>
    );
  },
);

export default Select;
