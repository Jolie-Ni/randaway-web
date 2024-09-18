import Paper from '@mui/material/Paper';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LocationList from './LocationList';
import GoogleMapBox from './GoogleMapBox';
import { useFetch } from '../hooks/useFetch';

const HomePage = () => {

    const GET_LOCATION_ENDPOINT = "https://us-central1-randaway-web-97767.cloudfunctions.net/api/locations"

    const { data, loading, error } = useFetch<Location[]>(GET_LOCATION_ENDPOINT); // Replace with your API URL

    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        ...theme.applyStyles('dark', {
          backgroundColor: '#1A2027',
        }),
      }));

    if (data == null) {
        return <div>Enable to fetch data. Try again</div>
    }


    return (
        <Paper sx={{ width: '100%' }}>
            <PageContainer>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={3}>
                        <Grid size="grow">
                            <Item>
                                <LocationList data={data}/>
                            </Item>
                        </Grid>
                        <Grid size={6}>
                            <Item>
                                <GoogleMapBox data={data}/>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </PageContainer>
        </Paper>
    );
}

export default HomePage;


// improvements:
// UI: make map occupy the whole window
// make list go to the right, staying on top of map
// make markers clickable
// - click on markers, address bar goes bold
// make address bar clickable
// - click on address bar, marker goes bold
// add delete button
// - delete icon on address bar
// - backend function to soft delete a marker

