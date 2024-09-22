import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { LocationListProps, Location } from "../types";
import "../App.css";

const LocationList: React.FC<LocationListProps> = ({ data }) => {
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
            <ListItem key={item.businessName}>
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
