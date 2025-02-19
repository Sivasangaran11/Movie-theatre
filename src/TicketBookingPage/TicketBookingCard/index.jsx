import { useState, useEffect } from "react";

// Material UI
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Stack,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useSeats } from "@/components/Hooks/seatsContext";

// Compo
import Loader from "@/components/Loader"; // Adjust the path as needed

// CSS
import "./style.css"; 

const TicketBookingCard = () => {
  // Local state management
  const [ticketBookingDetails, setTicketBookingDetails] = useState(null);
  const { selectedSeats } = useSeats();
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Simulate fetching ticket details (Replace this with an actual API call)
  useEffect(() => {
    setTimeout(() => {
      setTicketBookingDetails({
        movieDetails: {
          showId: 1234,
          movieName: "Avengers: Endgame",
          image: "https://via.placeholder.com/300x450",
          theaterName: "CGV Cinemas",
          screenName: "Screen 5",
          address: "123 Main Street, City",
          showTime: "7:30 PM",
          showDate: "25th Feb 2025",
        },
      });
      setLoading(false);
    }, 1500);
  }, []);

  // Function to render selected seats
  const renderSelectedSeats = () =>
    selectedSeats?.map((seat, idx) => (
      <span key={idx}>
        {seat.code}
        {idx !== selectedSeats.length - 1 ? ", " : ""}
      </span>
    ));

  // Function to calculate total price
  const renderPriceTotal = () => {
    const priceTotal = selectedSeats.reduce((total, seat) => total + seat.price, 0);
    return priceTotal.toLocaleString();
  };

  // Handle ticket booking
  const handleBookTicket = () => {
    setBookingLoading(true);

    // Simulating API call for booking
    setTimeout(() => {
      alert("Ticket booked successfully! ✅");
      setBookingLoading(false);
    }, 2000);
  };

  if (loading) return <Loader />;

  const movie = ticketBookingDetails?.movieDetails;

  return (
    <Card className="ticket-booking-card" elevation={24} square>
      {/* Movie Image */}
      <CardMedia className="ticket-booking-card__media" component="img" alt="Movie" image={movie?.image} />

      {/* Card Content */}
      <CardContent className="ticket-booking-card__content">
        <Typography className="ticket-booking-card__movie-name" component="h2" variant="h5">
          {movie?.movieName}
        </Typography>

        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
          <Box className="ticket-booking-card__movie-age-limit-label">PG-13</Box>
          <Typography className="ticket-booking-card__movie-age-limit-content" component="p">
            (*) This movie is recommended for viewers aged 13 and above.
          </Typography>
        </Stack>

        {/* Booking Details */}
        <List>
          <ListItem className="ticket-booking-card__booking-details">
            <ListItemText disableTypography>
              <strong>Theater:</strong> {movie?.theaterName} | {movie?.screenName}
            </ListItemText>
          </ListItem>
          <ListItem className="ticket-booking-card__booking-details">
            <ListItemText disableTypography>
              <strong>Address:</strong> {movie?.address}
            </ListItemText>
          </ListItem>
          <ListItem className="ticket-booking-card__booking-details">
            <ListItemText disableTypography>
              <strong>Showtime:</strong> {movie?.showTime} | {movie?.showDate}
            </ListItemText>
          </ListItem>
        </List>

        <Divider className="ticket-booking-card__divider" />

        {/* Selected Seats */}
        <List>
          <ListItem className="ticket-booking-card__booking-details">
            <ListItemText disableTypography>
              <strong>Seats:</strong> {selectedSeats.length > 0 ? renderSelectedSeats() : "Not selected"}
            </ListItemText>
          </ListItem>
        </List>

        <Divider className="ticket-booking-card__divider" />

        {/* Total Price */}
        <Typography className="ticket-booking-card__total" variant="h5" sx={{ mt: "13px" }}>
          <strong>Total:</strong> <strong style={{ color: "var(--primary)" }}>INR {renderPriceTotal()}</strong>
        </Typography>
      </CardContent>

      {/* Book Ticket Button */}
      <CardActions sx={{ justifyContent: "center" }}>
        <LoadingButton
          className="ticket-booking-card__btn-booking"
          variant="contained"
          onClick={handleBookTicket}
          loading={bookingLoading}
        >
          Book Ticket
        </LoadingButton>
      </CardActions>
    </Card>
  );
};

export default TicketBookingCard;
