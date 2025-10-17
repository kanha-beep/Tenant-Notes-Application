import React, { useEffect } from "react";
import api from "../init/instance.js";
import ViewButton from "../Components/Buttons/ViewButton.jsx";
export default function CurrentOwner({
  owner,
  token,
  navigate,
  setOwner,
  isPage,
}) {
  const currentOwner = async () => {
    try {
      const res = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOwner(res.data);
    } catch (e) {
      console.log("error Admin", e);
    }
  };

  useEffect(() => {
    currentOwner();
  }, []);
  return (
    <div>
      {owner && (
        <div
          key={owner?._id}
          className="p-3 mb-3 rounded-5 bg-info col-12 col-sm-6 col-md-4"
        >
          <p>
            Current OwnerId: <b>{owner?._id}</b> <br />
            Current Owner Name: <b>{owner?.username}</b>
          </p>
          {owner?.tenant?.name && (
            <p>
              Current tenant Name: <b>{owner?.tenantname}</b>
            </p>
          )}
          <p>isPage:{isPage}</p>
          <ViewButton navigate={navigate} n={owner} btnValue={"profile"} />
        </div>
      )}
    </div>
  );
}
