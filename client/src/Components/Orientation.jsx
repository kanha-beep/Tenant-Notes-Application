import React, { useEffect, useState } from "react";

export default function Orientation() {
  const [orient, setOrient] = useState(
    window.innerHeight > window.innerWidth ? "Portrait" : "Landscape"
  );
  useEffect(() => {
    const handleOrient = () => {
      setOrient(
        window.innerHeight > window.innerWidth ? "Portrait" : "Landscape"
      );
    };
    window.addEventListener("resize", handleOrient);
    return () => {
      window.removeEventListener("resize", handleOrient);
    };
  }, []);
  return (
    <div className="row">
      <p className="col-12 col-md-3 col-lg-3" style={{backgroundColor:"pink"}}>Orientation: {orient}</p>
    </div>
  );
}
