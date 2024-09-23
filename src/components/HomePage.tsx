import Paper from "@mui/material/Paper";
import GoogleMapBox from "./GoogleMapBox";
import useFetch from "../hooks/useFetch";
import { Location } from "../types";
import LocationList from "./LocationList";
import { LOCATION_ENDPOINT } from "../constant";
import { useContext } from "react";
import { LocationsContext } from "./RandawayProvider";

const HomePage = () => {

  return (
    <Paper sx={{ width: "100%" }}>
      <GoogleMapBox/>
      <LocationList/>
    </Paper>
  );
};

export default HomePage;

// improvements:
// fix codebase lint and indentation
// UI: restrict zone out
// UI: make map occupy the whole window(done)
// make default view point customized(done)
// make initial zoom to a proper position(done)
// - calculate view point(done)
// - calculate zoom level(done)

// make list go to the right, staying on top of map(done)
// make markers clickable
// - click on markers, address bar goes bold
// make address bar clickable
// - click on address bar, marker goes bold
// add delete button
// - delete icon on address bar(done)
// - backend function to soft delete a marker(done)
