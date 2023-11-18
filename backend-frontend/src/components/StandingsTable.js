import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { AppContext } from 'src/pages/_app';
import {
  getComparator,
} from 'src/helpers'


function StandingsTableHead(props) {
  const {
    order,
    orderBy,
    onRequestSort,
    largeScreen } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const headCells = [
    {
      id: 'team',
      numeric: false,
      disablePadding: false,
      label: '',
    },
    {
      id: 'team',
      numeric: false,
      disablePadding: false,
      label: 'Team',
    },
    {
      id: 'points',
      numeric: false,
      disablePadding: false,
      label: 'P',
    },
    {
      id: 'points_lost',
      numeric: false,
      disablePadding: false,
      label: 'PP',
      //onlyLargeScreen: true
    },
    {
      id: 'matches',
      numeric: false,
      disablePadding: false,
      label: 'J',
    },
    {
      id: 'victories',
      numeric: false,
      disablePadding: false,
      label: 'V',
    },
    {
      id: 'draws',
      numeric: false,
      disablePadding: false,
      label: 'E',
    },
    {
      id: 'losses',
      numeric: false,
      disablePadding: false,
      label: 'D',
    },
    {
      id: 'goals_for',
      numeric: false,
      disablePadding: false,
      label: 'GP',
    },
    {
      id: 'goals_against',
      numeric: false,
      disablePadding: false,
      label: 'GC',
    },
    {
      id: 'goal_difference',
      numeric: false,
      disablePadding: false,
      label: 'SG',
    },
  ];

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => {
          if (!largeScreen.width && headCell.onlyLargeScreen) return;

          return (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'center'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                sx={{
                  flexDirection: 'row-reverse',
                }}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  );
}

StandingsTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  largeScreen: PropTypes.object.isRequired
};


export default function StandingsTable(props) {
  // Context
  const context = React.useContext(AppContext);
  const largeScreen = context?.largeScreen;

  // States
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('points');
  const [selected, setSelected] = React.useState([]);

  const rows = props.data || [
    { "team": "Palmeiras", "points": 62, "points_lost": 40, "matches": 34, "victories": 18, "draws": 8, "losses": 8, "goals_for": 56, "goals_against": 30, "goal_difference": 26 },
    { "team": "Botafogo", "points": 60, "points_lost": 39, "matches": 33, "victories": 18, "draws": 6, "losses": 9, "goals_for": 53, "goals_against": 30, "goal_difference": 23 },
    { "team": "Grêmio", "points": 59, "points_lost": 43, "matches": 34, "victories": 18, "draws": 5, "losses": 11, "goals_for": 57, "goals_against": 50, "goal_difference": 7 },
    { "team": "Bragantino", "points": 59, "points_lost": 40, "matches": 33, "victories": 16, "draws": 11, "losses": 6, "goals_for": 46, "goals_against": 29, "goal_difference": 17 },
    { "team": "Atlético-MG", "points": 57, "points_lost": 45, "matches": 34, "victories": 16, "draws": 9, "losses": 9, "goals_for": 43, "goals_against": 27, "goal_difference": 16 },
    { "team": "Flamengo", "points": 57, "points_lost": 42, "matches": 33, "victories": 16, "draws": 9, "losses": 8, "goals_for": 50, "goals_against": 37, "goal_difference": 13 },
    { "team": "Athletico-PR", "points": 51, "points_lost": 51, "matches": 34, "victories": 13, "draws": 12, "losses": 9, "goals_for": 47, "goals_against": 39, "goal_difference": 8 },
    { "team": "Fluminense", "points": 47, "points_lost": 52, "matches": 33, "victories": 13, "draws": 8, "losses": 12, "goals_for": 43, "goals_against": 42, "goal_difference": 1 },
    { "team": "Cuiabá", "points": 47, "points_lost": 55, "matches": 34, "victories": 13, "draws": 8, "losses": 13, "goals_for": 36, "goals_against": 35, "goal_difference": 1 },
    { "team": "São Paulo", "points": 46, "points_lost": 53, "matches": 33, "victories": 12, "draws": 10, "losses": 11, "goals_for": 37, "goals_against": 35, "goal_difference": 2 },
    { "team": "Corinthians", "points": 44, "points_lost": 58, "matches": 34, "victories": 10, "draws": 14, "losses": 10, "goals_for": 39, "goals_against": 39, "goal_difference": 0 },
    { "team": "Fortaleza", "points": 43, "points_lost": 53, "matches": 32, "victories": 12, "draws": 7, "losses": 13, "goals_for": 36, "goals_against": 37, "goal_difference": -1 },
    { "team": "Internacional", "points": 43, "points_lost": 59, "matches": 34, "victories": 11, "draws": 10, "losses": 13, "goals_for": 38, "goals_against": 43, "goal_difference": -5 },
    { "team": "Santos", "points": 42, "points_lost": 60, "matches": 34, "victories": 11, "draws": 9, "losses": 14, "goals_for": 37, "goals_against": 55, "goal_difference": -18 },
    { "team": "Vasco", "points": 40, "points_lost": 59, "matches": 33, "victories": 11, "draws": 7, "losses": 15, "goals_for": 35, "goals_against": 43, "goal_difference": -8 },
    { "team": "Bahia", "points": 38, "points_lost": 64, "matches": 34, "victories": 10, "draws": 8, "losses": 16, "goals_for": 39, "goals_against": 47, "goal_difference": -8 },
    { "team": "Cruzeiro", "points": 37, "points_lost": 59, "matches": 32, "victories": 9, "draws": 10, "losses": 13, "goals_for": 29, "goals_against": 28, "goal_difference": 1 },
    { "team": "Goiás", "points": 35, "points_lost": 67, "matches": 34, "victories": 8, "draws": 11, "losses": 15, "goals_for": 34, "goals_against": 49, "goal_difference": -15 },
    { "team": "Coritiba", "points": 29, "points_lost": 73, "matches": 34, "victories": 8, "draws": 5, "losses": 21, "goals_for": 39, "goals_against": 67, "goal_difference": -28 },
    { "team": "América-MG", "points": 21, "points_lost": 81, "matches": 34, "victories": 4, "draws": 9, "losses": 21, "goals_for": 39, "goals_against": 71, "goal_difference": -32 }
  ];


  // ----------------------------------------
  //  Style for table rows
  // ----------------------------------------
  const StyledTableRow = styled(TableRow)(({ theme: appTheme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: appTheme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  // ----------------------------------------
  //  Button handlers
  // ----------------------------------------
  const handleRequestSort = (_event, property) => {
    console.log(property, order)
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (_event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 250 }}
            aria-labelledby="tableTitle"
            size={'small'}
          >
            <StandingsTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              largeScreen={largeScreen}
            />
            <TableBody>
              {rows
                .sort(getComparator(order, orderBy))
                .map((row, index) => {
                  return (
                    <StyledTableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                    >
                      {
                        // Rank
                      }
                      <TableCell align="center">{index+1}</TableCell>
                      {
                        // Team
                      }
                      <TableCell align="center">{row.team}</TableCell>
                      {
                        // Points
                      }
                      <TableCell align="center">{row.points}</TableCell>
                      {
                        // Points lost
                      }
                      <TableCell align="center">{row.points_lost}</TableCell>
                      {
                        // Games
                      }
                      <TableCell align="center">{row.matches}</TableCell>
                      {
                        // Victories
                      }
                      <TableCell align="center">{row.victories}</TableCell>
                      {
                        // Draws
                      }
                      <TableCell align="center">{row.draws}</TableCell>
                      {
                        // Losses
                      }
                      <TableCell align="center">{row.losses}</TableCell>
                      {
                        // Goals for
                      }
                      <TableCell align="center">{row.goals_for}</TableCell>
                      {
                        // Goals against
                      }
                      <TableCell align="center">{row.goals_against}</TableCell>
                      {
                        // Goal difference
                      }
                      <TableCell align="center">{row.goal_difference}</TableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

StandingsTable.propTypes = {
  title: PropTypes.string.isRequired,
};