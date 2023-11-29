import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import StandingsTable from '../components/StandingsTable';
import OptionPicker from '../components/OptionPicker';
import { matchesService, standingsService, alertService } from 'src/services';
import { withRouter } from 'next/router'
import { AppContext } from 'src/pages/_app';

function Index(props) {
  // Context
  const context = React.useContext(AppContext);
  const largeScreen = context?.largeScreen;
  const [isLoading, setIsLoading] = React.useState(false);

  const [matches, setMatches] = React.useState({});
  const [standings, setStandings] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState(1);
  const [selectedSubOption, setSelectedSubOption] = React.useState(1);

  const handleChange = (name, value) => {
    if (name === 'option') {
      setSelectedOption(value)
    } else {
      setSelectedSubOption(value)
    }
  };

  // -----------------------------------------------------
  // Get matches via API
  // -----------------------------------------------------
  React.useEffect(() => {
    let isSubscribed = true;
    setIsLoading(true);

    // Make request
    matchesService.getMatches()
      .then(payload => {
        if (isSubscribed) {
          setMatches(payload)
        }
        setIsLoading(false);
      })
      .catch(err => alertService.error(`API error: ${err}`));
    return () => {
      isSubscribed = false;
      setIsLoading(false);
    }
  }, []);

  // -----------------------------------------------------
  // Get standings
  // -----------------------------------------------------
  React.useEffect(() => {
    setIsLoading(true);
    setStandings(standingsService.getStandings(matches, selectedOption, selectedSubOption))
    setIsLoading(false);
  }, [matches, selectedOption, selectedSubOption]);

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
                <Stack spacing={1}>
                  <OptionPicker
                    selectedOption={selectedOption}
                    selectedSubOption={selectedSubOption}
                    handleChange={handleChange}
                  />
                  <StandingsTable
                    title="Brasileirao"
                    selectedOption={selectedOption}
                    selectedSubOption={selectedSubOption}
                    data={standings}
                  />
                </Stack>
              )
          }
        </Stack>
      </Box>
    </Container>
  );
}

export default withRouter(Index)
