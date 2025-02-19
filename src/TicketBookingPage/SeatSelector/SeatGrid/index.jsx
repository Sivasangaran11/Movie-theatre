import {React, useState} from "react";
import { Box, Grid } from "@mui/material";
import { useSeats } from "@/components/Hooks/SeatsContext";
import "./style.css";

const ALPHABET = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

const SeatGrid = ({ ticketBookingDetails }) => {
  const { selectedSeats, setSelectedSeats } = useSeats();
  console.log("Selected Seats in SeatGrid:", selectedSeats);
  const seats = ticketBookingDetails?.data?.seatList;
  if (!seats || seats.length < 1) return null;

  const SEATS_PER_ROW = 10; 
  const INDICATORS_PER_ROW = 2;
  const TOTAL_COLUMNS = SEATS_PER_ROW + INDICATORS_PER_ROW;
  const TOTAL_ROWS = 10;

  const handleChooseSeat = (id, price, code) => {
    setSelectedSeats((prevSeats) =>
      prevSeats.some((seat) => seat.id === id)
        ? prevSeats.filter((seat) => seat.id !== id)
        : [...prevSeats, { id, price, code }]
    );
  };

  const gridItems = [];
  let seatIndex = 0;

  for (let row = 0; row < TOTAL_ROWS; row++) {
    for (let col = 0; col < TOTAL_COLUMNS; col++) {
      const isRowStart = col === 0;
      const isRowEnd = col === TOTAL_COLUMNS - 1;

      if (isRowStart || isRowEnd) {
        gridItems.push(
          <Grid item xs={1} key={`indicator-${row}-${col}`}>
            <Box className="indicator">{ALPHABET[row]}</Box>
          </Grid>
        );
      } else {
        if (seatIndex >= seats.length) continue;

        let { seatId, seatPrice, isBooked, seatType } = seats[seatIndex];
        let seatCode = `${ALPHABET[row]}${col}`;

        let seatClass = "normal";
        if (seatType === "VIP") seatClass = "vip";
        if (selectedSeats.some((seat) => seat.id === seatId)) seatClass = "selected";
        if (isBooked) seatClass = "booked";

        gridItems.push(
          <Grid item xs={1} key={seatId}>
            <Box className={`seat-selector seat-wrapper ${seatClass}`}>
              <Box
                className="seat"
                onClick={() => !isBooked && handleChooseSeat(seatId, seatPrice, seatCode)}
              >
                {isBooked ? "X" : seatCode}
              </Box>
            </Box>
          </Grid>
        );

        seatIndex++;
      }
    }
  }

  return <Grid container spacing={1}>{gridItems}</Grid>;
};

export default SeatGrid;
