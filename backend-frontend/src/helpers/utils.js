export {
  capitalizeFirstLetter,
  customlocaleString,
  sortTitleAlphabetically,
  getComparator,
};

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}

function customlocaleString(value) {
  if (typeof value === 'string') {
    value = Number(value);
  }

  return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function sortTitleAlphabetically(a, b) {
  // See https://stackoverflow.com/a/37511463/660711
  const x = a.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const y = b.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  if (x > y) {
    return 1;
  }
  if (x < y) {
    return -1;
  }

  return 0;
}

function getComparator(order, orderBy) {
  return (a, b) => customComparator(a, b, order, orderBy)
}

const textHeadCells = ['team'];

function customComparator(a, b, order, orderBy) {
  let x, y;

  if (textHeadCells.includes(orderBy)) {
    x = a[orderBy];
    y = b[orderBy];
  } else {
    // Must convert to a number in order to compare correctly
    x = Number(a[orderBy]);
    y = Number(b[orderBy]);
  }

  // If orderBy points, special case
  if (["points", "pointsLost"].includes(orderBy) ) {
    return sortByPoints(a, b, order, orderBy);
  }

  const multiplier = order === 'desc' ? 1 : -1;
  
  if (y < x) {
    return -1 * multiplier;
  }

  if (y > x) {
    return 1 * multiplier;
  }

  return 0;
}

function sortByPoints(a, b, order, orderBy) {

  let orderMultiplier = order === 'desc' ? 1 : -1;
  let pointsLostMultiplier = 1;
  if (orderBy === "pointsLost") {
    pointsLostMultiplier = -1;
  }
  
  // First, compare points
  if (Number(a[orderBy]) > Number(b[orderBy])) {
    return -1 * orderMultiplier;
  } else if (Number(a[orderBy]) < Number(b[orderBy])) {
    return 1 * orderMultiplier;
  } else if (Number(a.victories) > Number(b.victories)) {
    return -1 * orderMultiplier * pointsLostMultiplier;
  } else if (Number(a.victories) < Number(b.victories)) {
    return 1 * orderMultiplier * pointsLostMultiplier;
  } else if (Number(a.goalDifference) > Number(b.goalDifference)) {
    return -1 * orderMultiplier * pointsLostMultiplier;
  } else if (Number(a.goalDifference) < Number(b.goalDifference)) {
    return 1 * orderMultiplier * pointsLostMultiplier;
  } else if (Number(a.goalsFor) > Number(b.goalsFor)) {
    return -1 * orderMultiplier * pointsLostMultiplier;
  } else if (Number(a.goalsFor) < Number(b.goalsFor)) {
    return 1 * orderMultiplier * pointsLostMultiplier;
  } else {
    return 0;
  }
}

