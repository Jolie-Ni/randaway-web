import { createContext, useEffect, useState } from "react";
import { RandawayContextType, ReactNodeProps } from "../types";
import { fetchDataFromApi } from "../services/fetchData";
import { LOCATION_ENDPOINT } from "../constant";
import { Location } from "../types";

const DataContext = createContext<RandawayContextType | undefined>(undefined);

const RandawayProvider: React.FC<ReactNodeProps> = ({ children }) => {
  const [locations, setLocations] = useState<Location[]>([]); // Replace `any` with the correct type for your data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchDataFromApi<Location[]>(LOCATION_ENDPOINT);
        setLocations(res);
      } catch (err: unknown) {
        console.log((err as Error)?.message || "error fetching locations");
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ locations, setLocations }}>
      {children}
    </DataContext.Provider>
  );
};

export default RandawayProvider;
