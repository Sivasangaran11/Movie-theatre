import React from "react";
import { Box, Typography, Grid2, Stack } from "@mui/material"; // Material UI components

import "./style.css"; // Styles

// Mock seat note items for display
const seatNoteItems = [
  {
    type: "selected",
    content: "Selected Seat",
  },
  {
    type: "sold",
    content: "Sold Seat",
  },
  {
    type: "vip",
    content: "VIP Seat",
  },
  {
    type: "selectable",
    content: "Selectable Seat",
  },
  {
    type: "unavailable",
    content: "Unavailable Seat",
  },
];

const SeatNote = () => (
  <Grid2 container spacing={2}>
    {seatNoteItems.map((item, idx) => (
      <Grid2 item xs={3} key={idx}>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          <Box className={`seat-note-box ${item.type}`}></Box>
          <Typography className="seat-note-text">{item.content}</Typography>
        </Stack>
      </Grid2>
    ))}
  </Grid2>
);

export default SeatNote;
