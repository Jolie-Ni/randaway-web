import React, { useContext } from "react";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import { Location } from "../types";
import "../App.css";
import { LOCATION_ENDPOINT } from "../constant";
import { postDatatoApi } from "../services/postData";
import { LocationsContext } from "./RandawayProvider";

const LocationList: React.FC = () => {
  const deleteThisLocation = (item: Location) => {
    // eslint-disable-next-line
    console.log(`delete location: ${item.businessName}`);
    const body = {
      locationIds: [`${item.instagram_id}:${item.request_id}`],
    };
    try {
      postDatatoApi(LOCATION_ENDPOINT, body);
    } catch (err: unknown) {
      // eslint-disable-next-line
      console.log((err as Error).message || "Error posting data");
    }
  };

  const context = useContext(LocationsContext);

  if (!context) {
    return <div>error getting locations</div>;
  }

  const { locations, setLocations } = context;

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 2,
        top: 0, // You can adjust the position
        right: 0,
      }}
    >
      <Box sx={{ width: 600, bgcolor: "background.paper", mt: 8, mr: 8 }}>
        <Typography variant="h5" gutterBottom>
          Location List
        </Typography>
        <List>
          {locations?.map((item: Location) => (
            <ListItem
              key={item.businessName}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteThisLocation(item)}
                >
                  <ClearIcon />
                </IconButton>
              }
            >
              <ListItemButton>
                <ListItemText primary={item.businessName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default LocationList;
