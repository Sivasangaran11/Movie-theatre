import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Material UI
import { Box, Container, Grid } from "@mui/material";

// Components
import TicketBookingCard from "./TicketBookingCard";
import SeatSelector from "./SeatSelector";
import Modal from "../components/Modal";
import { SeatsProvider } from "@/components/Hooks/SeatsContext";

// Custom Hook for Scroll To Top
import { useScrollToTop } from "@/components/Hooks/UseScrollToTop";

// Scss
import "./style.css";

const TicketBookingPage = () => {
  useScrollToTop();
  const { scheduleId } = useParams();

  // Mock data for modalProps and ticket details
  const [modalProps, setModalProps] = useState(null);
  const [ticketBookingDetails, setTicketBookingDetails] = useState(null);

  useEffect(() => {
    // Simulate fetching ticket booking details
    const fetchTicketBookingDetails = (scheduleId) => {
      // Mock ticket booking data based on scheduleId
      setTicketBookingDetails({
        scheduleId,
        data: "Ticket details for " + scheduleId,
      });
    };

    fetchTicketBookingDetails(scheduleId);

    // Simulate modal state
    setModalProps({
      open: true,
      content: "This is a mock modal content",
    });
  }, [scheduleId]);

  const handleCloseModal = () => {
    setModalProps(null);
  };

  return (
    <SeatsProvider>
      <Box className="container ticket-booking-page" component="section">
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid item md={8.5} xs={12}>
              <SeatSelector />
            </Grid>
            <Grid item md={3.5} xs={12}>
              <TicketBookingCard />
            </Grid>
          </Grid>
          {modalProps && (
            <Modal modalProps={modalProps} actCloseModal={handleCloseModal} />
          )}
        </Container>
      </Box>
    </SeatsProvider>
  );
};

export default TicketBookingPage;
