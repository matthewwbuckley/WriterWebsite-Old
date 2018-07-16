// UTILITY
const hasUserRated = function hasUserRated(piece, userId) {
  let userRated = false;
  piece.ratings.all.forEach((rating) => {
    if (rating.userId._id === userId) {
      userRated = true;
    }
  });
  return userRated;
};

export const submit = function submitPiece(apiURL, appRef, form, userId, title, text, wordLimit) {
  const submitURL = `${apiURL}piece/`;
  fetch(submitURL, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      author: userId,
      title,
      text,
      wordLimit,
    }),
  }).then(
    res => res.json(),
  ).then(
    (piece) => {
      if (piece.error) {
        form.setState({ error: piece.error });
      } else {
        form.setState({ pieceId: piece._id });
      }
    },
  );
};

export const get = function getPiece(apiURL, appRef, form, pieceId, userId) {
  const getPieceURL = `${apiURL}piece/${pieceId}`;
  fetch(getPieceURL, {
    method: 'get',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }).then(
    res => res.json(),
  ).then(
    (piece) => {
      if (piece.error) {
        form.setState({ error: piece.error });
      } else {
        const returnedPiece = JSON.parse(JSON.stringify(piece));

        // removes ratings if user has not rated && not author
        if (!hasUserRated(returnedPiece, userId) && userId !== piece.author._id) {
          for (let i = 0; i < piece.ratings.all.length; i += 1) {
            const rating = {
              rating: null,
              comment: null,
              dateCreated: null,
              userId: piece.ratings.all[i].userId,
            };
            // Linting disallows modifying piece. This is a deep copy.
            // Ratings are not returned if they have not rated themselves.
            returnedPiece.ratings.all[i] = rating;
          }
          returnedPiece.ratings.count = {};
          returnedPiece.ratings.averages = {};
        }
        form.setState({ piece: returnedPiece });
      }
    },
  );
};

export const getFull = function getFullPiece(apiURL, appRef, form, pieceId) {
  const getPieceURL = `${apiURL}piece/${pieceId}/full`;
  fetch(getPieceURL, {
    method: 'get',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }).then(
    res => res.json(),
  ).then(
    (piece) => {
      if (piece.error) {
        form.setState({ error: piece.error });
      } else {
        form.setState({ piece });
      }
    },
  );
};

// TODO: introduce the page functionality
export const getAll = function getAllPieces(apiURL, appRef, form, sort) {
  const getPieceURL = `${apiURL}piece/?sort=${sort}&page=1`;
  fetch(getPieceURL, {
    method: 'get',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }).then(
    res => res.json(),
  ).then(
    (pieces) => {
      if (pieces.error) {
        form.setState({ error: pieces.error });
      } else {
        // console.log(piece)
        form.setState({ pieces });
      }
    },
  );
};
