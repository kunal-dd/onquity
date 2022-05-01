import React from "react";
import { Field } from "formik";

const FormInput = ({
  label,
  type = "text",
  name,
  placeholder,
  extraClass,
}) => {
  return (
    <>
      <Field
        type={type}
        name={name}
        className={`${extraClass} ${
          type !== "checkbox" ? "form-control" : null
        }`}
        placeholder={placeholder}
      />

      <label
        className={`${type === "checkbox" ? "form-check-label text-xs" : null}`}
      >
        {label}
      </label>
    </>
  );
};

export default FormInput;
