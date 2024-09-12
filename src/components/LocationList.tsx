import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useFetch } from '../hooks/useFetch';

const GET_LOCATION_ENDPOINT = "https://us-central1-randaway-web-97767.cloudfunctions.net/api/locations"

interface Location {
    name: string,
    address: string
}


const LocationList: React.FC = () => {


  const { data, loading, error } = useFetch<Location[]>(GET_LOCATION_ENDPOINT); // Replace with your API URL

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Location List
      </Typography>
      <List>
        {data?.map((item: Location, index: number) => (
          <ListItem key={index}>
            <ListItemButton>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default LocationList;
