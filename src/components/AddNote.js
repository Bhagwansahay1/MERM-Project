import { Grid, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

function AddNote() {
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const context = useContext(noteContext);
  const { addNote } = context;

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={8} container>
          <Typography
            variant="h3"
            style={{ marginTop: "10px", marginLeft: "10px" }}
          >
            Add A Note
          </Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item xs={8}>
          <form>
            <Typography variant="h5" style={{ margin: "10px" }}>
              Title
            </Typography>
            <input
              type="text"
              placeholder="Title"
              style={{ width: "100%", height: "30px", margin: "10px" }}
              name="title"
              value={note.title}
              onChange={onChange}
            />
            <Typography variant="h5" style={{ margin: "10px" }}>
              Description
            </Typography>
            <textarea
              type="text"
              placeholder="Description"
              multiline="true"
              style={{ width: "100%", minHeight: "150px", margin: "10px" }}
              name="description"
              value={note.description}
              onChange={onChange}
            />
            <Typography variant="h5" style={{ margin: "10px" }}>
              Tag
            </Typography>
            <input
              type="text"
              placeholder="Tag"
              style={{ width: "100%", height: "30px", margin: "10px" }}
              name="tag"
              value={note.tag}
              onChange={onChange}
            />

            <input
              type="submit"
              value="Add Note"
              style={{
                width: "20%",
                height: "30px",
                margin: "10px",
              }}
              onClick={handleClick}
            />
          </form>
        </Grid>
      </Grid>
    </>
  );
}

export default AddNote;
