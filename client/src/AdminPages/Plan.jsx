import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Plan.css";
import api from "../init/instance.js";

export default function Plan() {
  const [userRole, setUserRole] = useState("");
  const [roleMsg, setRoleMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [isAlreadyPaid, setIsAlreadyPaid] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("tokens");
  const [data, setData] = useState({ amount: "" });
  const getPlan = async () => {
    try {
      const res = await api.get("/admin/plan", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("about tenant", res.data);
      if (res.data === "paid") {
        setMsg("Already a Premium User");
        setIsAlreadyPaid(true);
      }
    } catch (e) {
      console.log("error plan", e.response.data.message);
      setUserRole(e.response.data.user);
      setRoleMsg(e.response.data.message);
    }
  };
  const handleChange = (e) => {
    setData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };
  const handleBuyPlan = async (e) => {
    try {
      e.preventDefault();
      if (!data.amount || data.amount !== "100") {
        setMsg("Enter Correct Amount as Show on the screen");
        return;
      }
      console.log("plan ready", data); //
      const res = await api.post(`/admin/plan`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Plan: ", res.data);
      // navigate("/admin/dashboard");
    } catch (e) {
      console.log("error Plan F:", e.response.data);
    }
  };
  useEffect(() => {
    getPlan();
  }, [token]);
  return (
    <div>
      <h1> Buy Plan </h1>
      {msg !== "" && (
        <div
          className={`alert alert-danger ${msg !== "" ? "show" : ""}`}
          role="alert"
        >
          {msg}
        </div>
      )}
      {roleMsg !== "" && (
        <div
          className={`alert alert-danger ${msg !== "" ? "show" : ""}`}
          role="alert"
        >
          {roleMsg}
        </div>
      )}
      {!isAlreadyPaid && (
        <div>
          <form onSubmit={handleBuyPlan}>
            <label>Enter Rs 100 to Buy Plan</label>&nbsp;
            <input
              type="text"
              onChange={handleChange}
              placeholder="Enter Amount"
              name="amount"
              value={data.amount}
            />
            {/* <input
          type="text"
          onChange={handleChange}
          placeholder="Email of User"
          name="email"
          value={data.email}
        /> */}
            {/* <input
          type="text"
          onChange={handleChange}
          placeholder="Password of User"
          name="password"
          value={data.password}
        /> */}
            <br />
            <br />
            <button> buy </button>
          </form>
        </div>
      )}
      <br />
      {userRole === "user" && (
        <button
          onClick={() => {
            navigate("/notes");
          }}
        >
          Notes
        </button>
      )}
      <br />
      <br />
      <button
        onClick={() => {
          navigate("/admin/dashboard");
        }}
      >
        Dashboard
      </button>
    </div>
  );
}
