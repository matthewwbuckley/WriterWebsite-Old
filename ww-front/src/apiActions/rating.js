import { apiURL, appRef } from './index';

export const submitToPiece = function submitRatingToPiece(form, pieceId, userId, rating, text, wordLimit){
  const submitURL = apiURL + 'rating/';
  console.log(form, pieceId, userId, rating, text, wordLimit);
  fetch(submitURL, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      rating,
      pieceId,
      userId,
      comment:text
    })
  })
  .then(res => res.json())
  .then((rating) => {
    if(!!rating.error){
      form.setState({error: rating.error})
    } else {
      form.setState({rating});
    }
  })
}