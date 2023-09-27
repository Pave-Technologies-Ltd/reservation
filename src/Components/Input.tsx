import { useId, useState, ChangeEvent, useEffect } from "react";
interface InputType {
  label: string;
  type:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week"
    | "dropdown"
    | "select";
  value?: string | number;
  max?: number;
  placeholder?: string;
  setValue: (e: string | number) => void;
  options?: [];
  className?: string;
  disabled?: boolean;
  showSearchIcon?: boolean;
}

const Input = ({
  value,
  setValue,
  type = "text",
  label,
  placeholder,
  max,
  options = [],
  className,
  disabled = false,
  showSearchIcon = false,
}: InputType) => {
  const inputId = useId();

  const [inputValue, setInputValue] = useState<string | number>("");

  const handleInput = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e?.target?.value;

    // Use a regular expression to allow only numbers
    // const regex = /^[0-9]*$/;
    // console.log(String(inputValue).length);
    // console.log(String(value));

    if (max && String(value)?.length <= max) {
      setInputValue(`${value}`);
      setValue(`${value}`);
    } else if (!max) {
      setInputValue(`${value}`);
      setValue(`${value}`);
    }

    // setInputValue(value);
  };
  const updateInputValue = () => {
    switch (type) {
      case "email":
        return setInputValue(value as string);
      case "number":
        return setInputValue(value as number);
      case "text":
        return setInputValue(value as string);
      case "date":
        return setInputValue(value as string);
      default:
        return setInputValue(value as string);
    }
  };

  useEffect(() => {
    updateInputValue();
  }, [value, type]);

  return (
    <div>
      <h4 className="font-bold">{label}</h4>
      <label
        className="mb-2 block cursor-pointer text-sm font-bold text-gray-700"
        htmlFor={inputId}
      >
        {/* {StringCaser(label, { casetype: "capitalize", separator: "space" })} */}
      </label>
      {type === "dropdown" || type === "select" ? (
        <select
          // type={type}
          id={inputId}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => handleInput(e)}
          value={inputValue}
          className={`focus:shadow-outline w-full focus:outline-[#6f00e7] ring-[#6f00e7] border-[#6f00e7] appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none ${className}`}
        >
          <option></option>
          {options.map((option, key) => (
            <option value={option} key={key + 1}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative">
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 ${
              showSearchIcon ? "block" : "hidden"
            }`}
          >
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type={type}
            id={inputId}
            max={max}
            disabled={disabled}
            placeholder={placeholder}
            onChange={(e) => handleInput(e)}
            value={inputValue}
            className={`block w-full rounded-lg border border-[#6f00e7]  bg-white p-4 ${
              showSearchIcon ? "pl-10" : ""
            } text-sm text-black placeholder-black focus:outline-[#6f00e7] focus:border-[#6f00e7] ring-[#6f00e7] focus:ring-[#6f00e7] dark:text-black dark:placeholder-gray-400 ${className}`}
          />
        </div>
      )}
    </div>
  );
};

export default Input;
