import { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const GlobalContext = createContext();

// Create a provider component
export const GlobalProvider = ({ children }) => {
  // Initialize hotelId from sessionStorage if it exists (only in the browser)
  const [hotelId, setHotelId] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("hotelId");
    }
    return null;
  });

  // Update sessionStorage whenever hotelId changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (hotelId !== null) {
        sessionStorage.setItem("hotelId", hotelId);
      } else {
        sessionStorage.removeItem("hotelId"); // Remove from sessionStorage if hotelId is null
      }
    }
  }, [hotelId]);

  return (
    <GlobalContext.Provider value={{ hotelId, setHotelId }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Hook to use the global context
export const useGlobalContext = () => useContext(GlobalContext);
