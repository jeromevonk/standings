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
      id: 'rank',
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
      id: 'pointsLost',
      numeric: false,
      disablePadding: false,
      label: 'PP',
      onlyLargeScreen: true
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
      id: 'goalsFor',
      numeric: false,
      disablePadding: false,
      label: 'GP',
      onlyLargeScreen: true
    },
    {
      id: 'goalsAgainst',
      numeric: false,
      disablePadding: false,
      label: 'GC',
      onlyLargeScreen: true
    },
    {
      id: 'goalDifference',
      numeric: false,
      disablePadding: false,
      label: 'SG',
    },
    {
      id: 'percent',
      numeric: false,
      disablePadding: false,
      label: '%',
      onlyLargeScreen: true
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
              // sx={{ width: '10px' }} TODO
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

  // Props
  const { selectedOption, selectedSubOption } = props;

  // States
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('points');
  const [selected, setSelected] = React.useState([]);

  const rows = props.data || [];


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
                      key={row.team}
                    >
                      {
                        // Rank
                      }
                      <TableCell align="center">{index + 1}</TableCell>
                      {
                        // Team
                      }
                      <TableCell align="center">{row.team}</TableCell>
                      {
                        // Points
                      }
                      <TableCell align="center">{row.points}</TableCell>
                      {
                        // Points lost - only if largeScreen
                      }
                      {
                        largeScreen.width &&
                        <TableCell align="center">{row.pointsLost}</TableCell>
                      }
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
                        // Goals for - only if largeScreen
                      }
                      {
                        largeScreen.width &&
                        <TableCell align="center">{row.goalsFor}</TableCell>
                      }
                      {
                        // Goals against - only if largeScreen
                      }
                      {
                        largeScreen.width &&
                        <TableCell align="center">{row.goalsAgainst}</TableCell>
                      }
                      {
                        // Goal difference
                      }
                      <TableCell align="center">{row.goalDifference}</TableCell>
                      {
                        // Percent - only if largeScreen
                      }
                      {
                        largeScreen.width &&
                        <TableCell align="center">{Math.round((100 * row.points) / (row.matches * 3) * 10) / 10}</TableCell>
                      }
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