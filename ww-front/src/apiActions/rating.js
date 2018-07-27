// TODO: wordlimit
export const submitToPiece = function submitRatingToPiece(
  apiURL,
  appRef,
  form,
  pieceId,
  userId,
  rating,
  text,
  wordlimit,
) {
  const submitURL = `${apiURL}rating/`;
  console.log(wordlimit);
  fetch(submitURL, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      rating,
      pieceId,
      userId,
      comment: text,
    }),
  }).then(
    res => res.json(),
  ).then(
    (fullRating) => {
      if (fullRating.error) {
        form.setState({ error: rating.error });
      } else {
        window.location.reload();
        form.setState({ rating });
      }
    },
  );
};

