import React, { createContext, useState, useContext } from "react";

const SeatsContext = createContext();

// Custom hook 
const useSeats = () => useContext(SeatsContext);

const SeatsProvider = ({ children }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  return (
    <SeatsContext.Provider value={{ selectedSeats, setSelectedSeats }}>
      {children}
    </SeatsContext.Provider>
  );
};

export {useSeats, SeatsProvider}