interface InputType {
  fieldLabel: string;
  type: "text" | "email";
}

const Input = ({ fieldLabel, type }: InputType) => {
  return (
    <div>
      <h4 className="font-bold">{fieldLabel}</h4>
      <input
        type={type}
        className="w-full border p-1 pl-4 focus:outline-none "
      />
    </div>
  );
};

export default Input;
