import { createContext, useEffect, useState } from "react";
import { RandawayContextType, ReactNodeProps } from "../types";
import { fetchDataFromApi } from "../services/fetchData";
import { LOCATION_ENDPOINT } from "../constant";
import { Location } from "../types";

export const LocationsContext = createContext<RandawayContextType | undefined>(
  undefined,
);

const RandawayProvider: React.FC<ReactNodeProps> = ({ children }) => {
  const [locations, setLocations] = useState<Location[]>([]); // Replace `any` with the correct type for your data
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [error, setError] = useState<string | null>(null); // Track error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchDataFromApi<Location[]>(LOCATION_ENDPOINT);
        setLocations(res);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false); // Stop loading after the request completes
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display a loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Display an error if fetching fails
  }

  return (
    <LocationsContext.Provider value={{ locations, setLocations }}>
      {children}
    </LocationsContext.Provider>
  );
};

export default RandawayProvider;
