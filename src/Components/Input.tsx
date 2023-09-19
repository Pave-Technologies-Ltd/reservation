import { useState, ChangeEvent } from 'react';
interface InputType {
  fieldLabel: string;
  type: "text" | "email" | "number";
  number?: boolean;
}

const Input = ({ fieldLabel, type, number }: InputType) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Use a regular expression to allow only numbers
    const regex = /^[0-9]*$/;

    if (regex.test(value) && number === true) {
      return setInputValue(value);
    }

    if (number === undefined) {
      setInputValue(value);
    }

    // setInputValue(value);
  };
  return (
    <div>
      <h4 className="font-bold">{fieldLabel}</h4>
      <input
        value={inputValue}
        onChange={handleInputChange}
        type={type}
        className="w-full border border-[#868686] p-1 pl-4 focus:outline-none "
      />
    </div>
  );
};

export default Input;
