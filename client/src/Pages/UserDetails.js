import React, { useEffect, useState } from "react";
import Home from "./Home";

export default function UserDetails() {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    fetch("http://localhost:5000/user-data", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        console.log(data, "userData");
      });
  }, []);

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./login";
  };

  return (
    <>
      {userData && userData.data && (
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand">
              <b>Hii, {userData.data.fname}</b>
            </a>
            <button onClick={logOut} className="btn btn-success">
              Log Out
            </button>
          </div>
        </nav>
      )}

      <Home />
    </>
  );
}
