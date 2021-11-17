import { Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import noteContext from "../context/notes/noteContext";
import BasicModal from "./Modal";

function Noteitem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note } = props;

  return (
    <>
      <Grid item xs={4} container>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {note.title}
            </Typography>
            <Typography variant="body2">{note.description}</Typography>
          </CardContent>
          <CardActions>
            <BasicModal note={note} />
            <Button
              size="small"
              onClick={() => {
                deleteNote(note._id);
              }}
            >
              <DeleteIcon />
              Delete
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}

export default Noteitem;
