import React, { useContext, useRef, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import noteContext from "../context/notes/noteContext";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, Typography } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const currentNote = props.note;
  const context = useContext(noteContext);
  const { editNote } = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  const [open, setOpen] = React.useState(false);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const handleOpen = () => {
    setOpen(true);
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };
  const handleClose = () => setOpen(false);
  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Button ref={ref} size="small" onClick={handleOpen}>
        <EditIcon />
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container justifyContent="flex-end">
            <Button onClick={handleClose} ref={refClose}>
              <CloseIcon />
            </Button>
          </Grid>
          <form>
            <Typography variant="h5">Title</Typography>
            <input
              type="text"
              placeholder="Title"
              style={{ width: "100%", height: "30px", marginTop: "10px" }}
              name="etitle"
              value={note.etitle}
              onChange={onChange}
            />
            <Typography variant="h5" style={{ marginTop: "10px" }}>
              Description
            </Typography>
            <textarea
              type="text"
              placeholder="Description"
              multiline="true"
              style={{ width: "100%", minHeight: "150px", marginTop: "10px" }}
              name="edescription"
              value={note.edescription}
              onChange={onChange}
            />
            <Typography variant="h5" style={{ marginTop: "10px" }}>
              Tag
            </Typography>
            <input
              type="text"
              placeholder="Tag"
              style={{ width: "100%", height: "30px", marginTop: "10px" }}
              name="etag"
              value={note.etag}
              onChange={onChange}
            />

            <input
              type="submit"
              value="Update Note"
              style={{
                // width: "30%",
                height: "30px",
                marginTop: "10px",
              }}
              onClick={handleClick}
            />
          </form>
        </Box>
      </Modal>
    </div>
  );
}
