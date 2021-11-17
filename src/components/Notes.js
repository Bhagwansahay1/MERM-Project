import { Grid } from "@mui/material";
import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import { Link, useNavigate } from "react-router-dom";

function Notes() {
  const Navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      Navigate("/login");
    }
  }, []);

  return (
    <>
      <Grid item xs={12} container>
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} />;
        })}
      </Grid>
    </>
  );
}

export default Notes;
