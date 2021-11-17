import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

function About() {
  const context = useContext(noteContext);
  const { GetUserData, userData } = context;
  const Navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      GetUserData();
    } else {
      Navigate("/login");
    }
  }, []);
  return (
    <>
      <div>
        <h1>Hello About Page</h1>
        <h2>
          {userData.name} and {userData.email}
        </h2>
      </div>
    </>
  );
}

export default About;
