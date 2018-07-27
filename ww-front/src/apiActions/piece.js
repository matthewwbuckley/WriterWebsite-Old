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
        // Linting disallows modifying piece. This is a deep copy.
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

export const getAll = function getAllPieces(apiURL, appRef, form, sort, page) {
  const getPieceURL = `${apiURL}piece/?sort=${sort}&page=${page}`;
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
        console.log(pieces);
        form.setState({ pieces: pieces.selectedPieces, isLast: pieces.isLast });
      }
    },
  );
};

export const getAllByAuthor = function getAllByAuthor(apiURL, appRef, form, userId) {
  const getPieceURL = `${apiURL}piece/?author=${userId}`;
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
        console.log(form, pieces);
        form.setState({ pieces: pieces.selectedPieces });
      }
    },
  );
};
