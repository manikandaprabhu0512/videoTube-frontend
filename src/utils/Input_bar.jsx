import React from "react";

function Input_bar({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  required,
}) {
  return (
    <input
      className="w-full outline-none bg-transparent py-2.5 "
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      required={required || true}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}

export default Input_bar;
