import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { LocationListProps } from '../types';
import { Location } from '../types';


const LocationList: React.FC<LocationListProps>= ({ data }) => {

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Location List
      </Typography>
      <List>
        {data?.map((item: Location, index: number) => (
          <ListItem key={index}>
            <ListItemButton>
              <ListItemText primary={item.businessName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default LocationList;
