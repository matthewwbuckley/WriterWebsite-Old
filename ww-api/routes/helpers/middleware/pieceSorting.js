// Sorting returns null if values not supplied. Is this good practice?
const recentSort = function recentSort(a, b) {
  if (a.datePublished && b.datePublished) {
    const aDate = new Date(a.datePublished);
    const bDate = new Date(b.datePublished);
    return (bDate - aDate);
  }
  return null;
};

const ratingWeekSort = function ratingWeekSort(a, b) {
  if (a.ratings.averages.week && b.ratings.averages.week) {
    return (b.ratings.averages.week - a.ratings.averages.week);
  }
  return null;
};

const ratingMonthSort = function ratingMonthSort(a, b) {
  if (a.ratings.averages.month && b.ratings.averages.month) {
    return (b.ratings.averages.month - a.ratings.averages.month);
  }
  return null;
};

const ratingYearSort = function ratingYearSort(a, b) {
  if (a.ratings.averages.year && b.ratings.averages.year) {
    return (b.ratings.averages.year - a.ratings.averages.year);
  }
  return null;
};

exports.sort = function sortPiecesByStringValue(array, sortType) {
  // copy array to keep to functional principals
  const rArray = array.slice();

  switch (sortType) {
    case 'recent':
      rArray.sort((a, b) => recentSort(a, b));
      break;
    case 'week':
      rArray.sort((a, b) => ratingWeekSort(a, b));
      break;
    case 'month':
      rArray.sort((a, b) => ratingMonthSort(a, b));
      break;
    case 'year':
      rArray.sort((a, b) => ratingYearSort(a, b));
      break;
    default:
      rArray.sort((a, b) => recentSort(a, b));
  }

  return rArray;
};

module.exports = exports;
