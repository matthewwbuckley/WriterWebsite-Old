import { apiURL, appRef } from './index';

export const submit = function submitPiece(form, userId, title, text, wordLimit){
  const submitURL = apiURL + 'piece/';
  fetch(submitURL, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      author: userId,
      title,
      text,
      wordLimit
    })
  })
  .then(res => res.json())
  .then((piece) => {
    if(!!piece.error){
      form.setState({error: piece.error})
    } else {
      form.setState({piece});
    }
  })
}

export const get = function getPiece(form, pieceId, userId){
  const getPieceURL = apiURL + 'piece/' + pieceId;
  fetch(getPieceURL, {
    method: 'get',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(res => res.json())
  .then((piece) => {
    if(!!piece.error){
      form.setState({error: piece.error})
    } else {
      console.log(piece)
      if(!hasUserRated(piece, userId)){
        for(let i = 0; i < piece.ratings.all.length; i++){
          let rating = {rating:null, comment:null, dateCreated:null, userId: piece.ratings.all[i].userId}
          piece.ratings.all[i] = rating;
          piece.ratings.count = {};
          piece.ratings.averages = {};
        }
      } else {
        
      }
      form.setState({piece});
    }
  })
}

export const getFull = function getFullPiece(form, pieceId){
  const getPieceURL = apiURL + 'piece/' + pieceId + '/full';
  fetch(getPieceURL, {
    method: 'get',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(res => res.json())
  .then((piece) => {
    if(!!piece.error){
      form.setState({error: piece.error})
    } else {
      // console.log(piece)
      form.setState({piece})
    }
  })
}

export const getAll = function getAllPieces(form){
  const getPieceURL = apiURL + 'piece/';
  fetch(getPieceURL, {
    method: 'get',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(res => res.json())
  .then((pieces) => {
    if(!!pieces.error){
      form.setState({error: pieces.error})
    } else {
      // console.log(piece)
      form.setState({pieces})
    }
  })
}

// UTILITY
const hasUserRated = function hasUserRated(piece, userId){
  let userRated = false;
  piece.ratings.all.forEach(rating => {
    console.log(rating.userId, userId, rating.userId === userId)
    if(rating.userId._id === userId){
      userRated = true;
    }
  })
  return userRated;
}