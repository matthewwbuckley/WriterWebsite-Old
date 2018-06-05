import { registerUser, signInUser, refreshAuth, logout } from './auth';
import { submit, get, getFull, getAll } from './piece';
import { submitRead } from './reading';
import { submitToPiece, submitToReading } from './rating';

export const apiURL = 'http://localhost:8080/api/';
// export const apiURL = 'https://backend-dot-writer-205511.appspot.com/api'
export let appRef = null;

// the reference to the app is set by calling this function in the app
export const setAppRef = function setAppRefForApiIndex(app){
  appRef = app;
}

// AUTH CALLS
export const register = function register(...args){
  registerUser(...args);
}

export const signIn = function signIn(...args){
  signInUser(...args);
}

export const refresh = function refesh(...args){
  refreshAuth(...args);
}

export const logoutUser = function logoutUser(...args){
  logout(...args);
}

// PIECE CALLS
export const submitPiece = function submitPiece(...args){
  submit(...args);
}

export const getPiece = function getPiece(...args){
  get(...args);
}

export const getFullPiece = function getFullPiece(...args){
  getFull(...args);
}

export const getAllPieces = function getAllPieces(...args){
  getAll(...args);
}

// READING CALLS
export const submitReading = function submitReading(...args){
  submitRead(...args);
}

// RATING CALLS
export const submitRating = function submitRating(...args){
  submitToPiece(...args);
}

export const submitReadRating = function submitReadRating(...args){
  submitToReading(...args);
}