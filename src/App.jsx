import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import TicketBookingPage from "./TicketBookingPage";

// Styles

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Ticket Booking Page */}
        <Route path="/" element={<TicketBookingPage />} />

        {/* 404 Page */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
