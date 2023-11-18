import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import StandingsTable from '../components/StandingsTable';
import { standingsService, alertService } from 'src/services';
import { withRouter } from 'next/router'
import { AppContext } from 'src/pages/_app';

function Index(props) {
  // Context
  const context = React.useContext(AppContext);
  const largeScreen = context?.largeScreen;
  const [isLoading, setIsLoading] = React.useState(false);

  const [standings, setStandings] = React.useState({});


  // -----------------------------------------------------
  // Get standings via API
  // -----------------------------------------------------
  React.useEffect(() => {
    let isSubscribed = true;
    setIsLoading(true);

    // Make request
    standingsService.getStandings()
      .then(payload => {
        if (isSubscribed) {
          setStandings(payload)
        }
        setIsLoading(false);
      })
      .catch(err => alertService.error(`API error: ${err}`));
    return () => {
      isSubscribed = false;
      setIsLoading(false);
    }
  }, []);

  {
    console.log(standings)
  }

  return (
    <Container 
      maxWidth="xl"
      sx={{ paddingLeft: '12px', paddingRight: '12px' }}
    >
      <Box sx={{ my: 2 }}>
        <Stack spacing={1}>
          {
            // If loading, show 'progress'
            isLoading ?
              (
                <Box>
                  <LinearProgress color="primary" />
                </Box>
              ) :
              (
                <StandingsTable
                  title="Brasileirao"
                  // data={standings} // TODOOOOOOOOOOOOOOOOOO
                />
              )
          }
        </Stack>
      </Box>
    </Container>
  );
}

export default withRouter(Index)
