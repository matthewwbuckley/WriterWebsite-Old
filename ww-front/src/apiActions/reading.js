// TODO: remove
export const submitRead = function submitRead(
  apiURL,
  appRef,
  form,
  file,
  userId,
  pieceId,
) {
  const submitURL = `${apiURL}reading/`;
  const data = new FormData();
  data.append('file', file);
  data.append('userId', userId);
  data.append('pieceId', pieceId);
  fetch(submitURL, {
    method: 'post',
    body: data,
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

export default submitRead;
