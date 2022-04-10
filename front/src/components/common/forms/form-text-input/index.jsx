import React from "react";

const FormTextInput = (props) => {
  const { label, type = "text", name, value, onChange, placeholder } = props;
  return (
    <div className="form-floating onquity-input mb-3">
      <input
        type={type}
        name={name}
        className="form-control"
        id="floatingInput"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <label>{ label }</label>
      {/* <!-- for invalid input error -->
                                <!-- <span className="mt-2 d-inline-block text-xs text-red-de">opps! invalid mobile number</span> --> */}
    </div>
  );
};

export default FormTextInput;
