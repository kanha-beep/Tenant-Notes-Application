import React, { useState } from "react";
import AllNotesButton from "../../Components/Buttons/AllNotesButton.jsx";
import AllUsersButton from "../../Components/Buttons/AllUsersButton.jsx";
import PlanButton from "../../Components/Buttons/PlanButton.jsx"
import HealthButton from "../../Components/Buttons/HealthButton.jsx"
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
export default function Right({ className, details }) {
  const [value, setValue] = useState(new Date());
  return (
    <div className={className} style={{ backgroundColor: "aqua" , minHeight:"35rem"}}>
      {/* //1. header  */}
      <h1 className="text-center">Dashboard</h1>
      {/* //2. numbers */}
      <div className="card shadow d-flex flex-row justify-content-center">
        <div
          className="card-body border border-darker"
          style={{ backgroundColor: "aliceblue" }}
        >
          <h3 className="card-title">No of Notes</h3>
          <h4 className="card-text">{details?.totalNotes ?? 0}</h4>
          <AllNotesButton />
        </div>
        <div className="card-body order border-darker">
          <h3 className="card-title">No of Users</h3>
          <h4 className="card-text">{details?.totalUsers ?? 0}</h4>
          <AllUsersButton />
        </div>
      </div>
      <div className="d-flex mt-1">
        {/* //left - targets */}
        <div className="left col-6 col-md-6 col-lg-6">
          {/* //left - calendar events */}
          <Calendar onChange={setValue} value={value} />
          <div className="d-flex mt-3 justify-content-evenly" style={{maxWidth:"22rem", backgroundColor:"pink"}}>
            <PlanButton/>
            <HealthButton/>
          </div>
        </div>
        {/* //right - Avg */}
        <div className="right col-6 col-md-6 col-lg-6">
          <div className="avg w-100 h-100" style={{backgroundColor:"yellow"}}>
            <p className="text-center">Targets</p>
          </div>
        </div>
      </div>
    </div>
  );
}
