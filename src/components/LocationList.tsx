import React from "react";
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

import { LocationListProps, Location } from "../types";
import "../App.css";
import { LOCATION_ENDPOINT } from "../constant";
import { postDatatoApi } from "../services/postData";

const LocationList: React.FC<LocationListProps> = ({ data }) => {
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
          {data?.map((item: Location) => (
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
                <ListItemText primary={item.instagram_id} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default LocationList;
