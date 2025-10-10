import React, { useEffect, useState } from "react";
import api from "../../init/api";
import Left from "./Left";
import Right from "./Right";

export default function Dashboard({ isLoggedIn }) {
  const [details, setDetails] = useState(null);
  const token = localStorage.getItem("tokens");

  const getAllDetails = async () => {
    try {
      const res = await api.get("/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("all details Dashboard:", res.data);
      setDetails(res.data);
    } catch (e) {
      console.log("error", e.response.data);
    }
  };

  useEffect(() => {
    getAllDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="mt-4 main container-fluid mx-auto"
      style={{ height: "100%", width: "95%", backgroundColor: "red" }}
    >
      {/* //need left and right to move */}
      <div className="row">
        {/* //left div starts - Profile */}
        <Left className="me-5 col-12 col-md-2 col-lg-2" />
        {/* ///left div ends */}
        {/* //right div starts - dashboard */}
        <Right className="dashboard col-12 col-md-9 col-lg-9" details={details} />
        {/* right div ends */}
      </div>
      {/* //main row div of left and right ends */}
      {/* </div> */}

      {isLoggedIn && (
        <>
          <div className="container-fluid">
            <div className="">
              {/* first child */}
              {/* <div className="col-md-6 mb-2 col-lg-5">
                <div className="card text-center shadow">
                  <div className="card-body">
                    <h5 className="card-title shadow-lg">No of Notes</h5>
                    <p className="card-text"></p>
                  </div>
                </div>
              </div> */}
              {/* second child */}
              {/* <div className="col-md-6 mb-2 col-lg-5">
                <div className="card text-center shadow">
                  <div className="card-body">
                    <h5 className="card-title shadow-lg">No of Users</h5>
                    <p className="card-text">{details?.totalUsers ?? 0}</p>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
