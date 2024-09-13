import Paper from '@mui/material/Paper';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LocationList from './LocationList';
import GoogleMapBox from './GoogleMapBox';

const HomePage = () => {

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


    return (
        <Paper sx={{ width: '100%' }}>
            <PageContainer>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={3}>
                        <Grid size="grow">
                            <Item>
                                <LocationList/>
                            </Item>
                        </Grid>
                        <Grid size={6}>
                            <Item>
                                <GoogleMapBox />
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </PageContainer>
        </Paper>
    );
}

export default HomePage;

