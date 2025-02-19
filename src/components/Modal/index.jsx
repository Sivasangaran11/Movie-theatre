import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Material UI
import {
  Stack,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

// Styles
import "./style.css";

const Modal = () => {
  const navigate = useNavigate();

  // State to manage modal visibility and content
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "Booking Confirmation",
    children: ["Your ticket has been successfully booked."],
    buttonContent: "OK",
    path: "/home",
  });

  // Function to open the modal with dynamic content
  const openModal = (content) => {
    setModalContent(content);
    setOpen(true);
  };

  // Function to close the modal
  const handleClose = (event, reason) => {
    if (reason === "backdropClick") return; // Prevent closing by clicking outside

    if (modalContent.path) {
      navigate(modalContent.path); // Navigate if a path is provided
    }

    setOpen(false); // Close the modal
  };

  // Render modal content dynamically
  const renderContent = () =>
    modalContent.children?.map((item, idx) => (
      <DialogContentText key={idx} className="ticket-booking-dialog__info">
        {item}
      </DialogContentText>
    ));

  return (
    <>
      {/* Trigger Button to Open Modal */}
      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          openModal({
            title: "Success",
            children: ["Your seat is confirmed!"],
            buttonContent: "Go to Home",
            path: "/home",
          })
        }
      >
        Open Modal
      </Button>

      {/* Modal Component */}
      <Dialog
        className="ticket-booking-dialog"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="ticket-booking-dialog__title">
          {modalContent.title}
        </DialogTitle>

        <DialogContent dividers>
          <Stack spacing={1}>{renderContent()}</Stack>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleClose}
            className="ticket-booking-dialog__btn-accept"
          >
            {modalContent.buttonContent}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Modal;
