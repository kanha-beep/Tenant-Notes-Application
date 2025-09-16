import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import api from "../init/api"

export default function AllUsers() {
  const navigate = useNavigate();
  const [owner, setOwner] = useState([]);
  const token = localStorage.getItem("tokens");
  const [users, setUsers] = useState([]);
  //done
  const handleDelete = async (userId) => {
    const res = await api.delete(
      `/api/admin/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    getAllUsers();
    currentAdmin();
    console.log("user deleted", res.data);
  };
  // done
  const currentAdmin = async () => {
    try {
      const res = await api.get("/api/admin/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("current Admin AllUsers:", res.data);
      setOwner(res.data);
    } catch (e) {
      console.log("error Admin", e);
    }
  };
  // done
  const getAllUsers = async () => {
    try {
      const res = await api.get("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("All Users:", res.data);
      setUsers(res.data);
    } catch (e) {
      console.log("error in AllUsers:", e);
    }
  };
  useEffect(() => {
    getAllUsers();
    currentAdmin();
  }, [token]);
  return (
    <div>
      <div className="m-1 p-1 " style={{ backgroundColor: "aqua" }}>
        All Users
      </div>
      <div>
        <button onClick={() => navigate(`/admin/users/new`)}>
          Create Users
        </button>
      </div>
      <div>
        {owner && (
          <div key={owner?._id}>
            <p>
              Current OwnerId: <b>{owner?._id}</b> <br />
              Current Owner Name: <b>{owner?.username}</b>
            </p>
            {owner?.tenant?.name && (
              <p>
                Current tenant Name: <b>{owner?.tenantname}</b>
              </p>
            )}
          </div>
        )}
        {users &&
          users.map((n) => (
            <div key={n._id}>
              <br />
              <div
                className="m-1 p-1"
                style={{
                  backgroundColor: "aqua",
                  height: "20rem",
                  width: "20rem",
                }}
              >
                <div>
                  <p>
                    Owner Name: <b>{n.username}</b>
                  </p>
                </div>
                <div>
                  <p>
                    Owner Id: <b>{n._id}</b>{" "}
                  </p>
                </div>
                <div>
                  <p> {n.title}</p>
                </div>
                <div>
                  <p>Content: {n.content}</p>
                </div>
                <div>
                  <p>
                    Id: <b>{n._id}</b>
                  </p>
                  <p>
                    Current tenant Name: <b>{n.tenant}</b>
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/admin/users/${n._id}`)}
                  className="m-1"
                >
                  View{" "}
                </button>
                <br />
                <button onClick={() => handleDelete(n._id)}>Delete</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
