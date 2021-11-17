import { Grid, Typography } from "@mui/material";
import React from "react";
import AddNote from "./AddNote";
import Notes from "./Notes";

function Home() {
  return (
    <>
      <AddNote />
      <Grid
        item
        container
        direction="row"
        justifyContent="center"
        style={{ marginTop: "20px" }}
      >
        <Grid item container justifyContent="center" alignItems="center" xs={8}>
          <Grid
            item
            container
            spacing={4}
            alignContent="flex-start"
            justifyContent="center"
          >
            <Notes />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
