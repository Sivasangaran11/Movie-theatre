import React, { useState, useEffect } from "react";
import { Box, Typography, Grid2 } from "@mui/material";
import Loader from "../../components/Loader";
import SeatGrid from "./SeatGrid";
import SeatNote from "./SeatNote";
import "./style.css";

const SeatSelector = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const ticketData = {
    data: {
      seatList: [],
    },
  };

  // Define 10 rows using alphabets A to J
  const ROW_LABELS = "ABCDEFGHIJ"; // 10 rows
  const VIP_ROWS = "FGHIJ";

  for (let row = 0; row < 10; row++) {
    for (let col = 1; col <= 10; col++) {
      const seatId = `${ROW_LABELS[row]}${col}`; // A1, A2 ... J16
      const seatType = VIP_ROWS.includes(ROW_LABELS[row]) ? "VIP" : "Normal";
      const seatPrice = seatType === "VIP" ? 200 : 120;
      const isBooked = Math.random() < 0.3; // 30% chance of being booked

      ticketData.data.seatList.push({ seatId, seatType, seatPrice, isBooked });
    }
  }

  return (
    <Box className="seat-selector">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Typography className="seat-selector__title" variant="h4">
            Select Seat:
          </Typography>
          <Box
            className="seat-selector__map-wrapper"
            sx={{ overflow: { lg: "visible", xs: "scroll" } }}
          >
            <Grid2
              container
              className="seat-selector__map"
              sx={{ width: { lg: "100%", xs: "750px" } }}
            >
              <Grid2 item xs={12}>
                <Box className="seat-selector__screen"></Box>
                <Typography
                  className="seat-selector__screen-title"
                  variant="h5"
                  color="white"
                >
                  Screen
                </Typography>
                <Grid2
                  className="seat-selector__map-grid"
                  container
                  spacing={1}
                >
                  <SeatGrid ticketBookingDetails={ticketData} />
                </Grid2>
                <Grid2
                  className="seat-selector__seat-notes-container"
                  container
                >
                  <SeatNote />
                </Grid2>
              </Grid2>
            </Grid2>
          </Box>
        </>
      )}
    </Box>
  );
};

export default SeatSelector;
