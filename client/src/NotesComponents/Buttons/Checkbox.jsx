import React from "react";

export default function Checkbox({onChange}) {
    const handleCheckBox = () =>{
        onChange("check")
    }
  return <div>
    <input type="checkbox" onClick={handleCheckBox}/>
  </div>;
}
