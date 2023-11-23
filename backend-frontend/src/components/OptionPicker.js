import * as React from 'react';
import PropTypes from 'prop-types';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import { AppContext } from 'src/pages/_app';

const options = [
  "Atualizada",
  "Mandante",
  "Visitante",
  "Turno",
  "Returno",
  "Últimas X",
  "Até rodada X",
  "Data específica",
]


export default function OptionPicker(props) {
  const { handleChange, selectedOption, selectedSubOption } = props;

  const context = React.useContext(AppContext);
  const largeScreen = context?.largeScreen;

  const getSubOption = (selectedOption, selectedSubOption) => {
    if (selectedOption === "Atualizada") {
      return (
        <Stack
          alignItems="center"
          justify="center"
          // direction="horizontal"
        >
          <FormControl>
            <FormLabel id="atualizada-sub-formlabel">Ordenar por</FormLabel>
            <RadioGroup
              row
              name="atualizadaSubOption"
              onChange={
                (event) => {
                  // Set state
                  const { value } = event.target;
                  handleChange('subOption', value);
                }
              }
            >
              <FormControlLabel value="pontosGanhos" control={<Radio checked={selectedSubOption === 'pontosGanhos'} />} label="pontosGanhos" />
              <FormControlLabel value="pontosPerdidos" control={<Radio checked={selectedSubOption === 'pontosPerdidos'} />} label="pontosPerdidos" />
            </RadioGroup>
          </FormControl>
        </Stack>

      )
    } else {
      return (<div></div>)
    }
  }

  // Custom padding
  const padding = { padding: { xs: '7px 4px', md: '7px 20px' } };
  return (
    <Stack>
      <Grid
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > :not(style) + :not(style)': { mb: 2 },
        }}
      >
        <ToggleButtonGroup
          color="primary"
          exclusive
          onChange={(_event, value) => { handleChange('option', value) }}
        >
          {
            options.map(opt => {
              return (
                <ToggleButton
                  key={opt}
                  value={opt}
                  size="small" sx={padding}
                  selected={opt === selectedOption}
                >
                  {opt}
                </ToggleButton>)
            })
          }
        </ToggleButtonGroup>
      </Grid>
      {getSubOption(selectedOption, selectedSubOption)}
    </Stack>
  );
}

OptionPicker.propTypes = {
//todo
};