import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import StandingsTable from '../components/StandingsTable';
import OptionPicker from '../components/OptionPicker';
import { matchesService, standingsService } from 'src/services';
import { withRouter } from 'next/router'
import { AppContext } from 'src/pages/_app';

export async function getServerSideProps() {
  const matches = await matchesService.getMatches();

  return {
    props: {
      matches
    },
  }
}

function Index(props) {
  // Context
  const context = React.useContext(AppContext);
  const [standings, setStandings] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState(1);
  const [selectedSubOption, setSelectedSubOption] = React.useState(1);

  const { matches } = props;

  const handleChange = (name, value) => {
    if (name === 'option') {
      setSelectedOption(value)

      // Default values for subOptions
      if (value === 6) setSelectedSubOption(10)
      if (value === 7) setSelectedSubOption(30)
      if (value === 8) setSelectedSubOption(new Date(2023, 11, 5))
    } else {
      setSelectedSubOption(value)
    }
  };

  // -----------------------------------------------------
  // Get standings
  // -----------------------------------------------------
  React.useEffect(() => {
    setStandings(standingsService.getStandings(matches, selectedOption, selectedSubOption))
  }, [selectedOption, selectedSubOption]);

  return (
    <Container
      maxWidth="xl"
      sx={{ paddingLeft: '12px', paddingRight: '12px' }}
    >
      <Box sx={{ my: 2 }}>
        <Stack spacing={1}>
          {
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
          }
        </Stack>
      </Box>
    </Container>
  );
}

export default withRouter(Index)
