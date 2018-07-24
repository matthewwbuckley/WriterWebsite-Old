import {
  registerUser,
  signInUser,
  refreshAuth,
  logout,
} from './auth';
import {
  submit,
  get,
  getAll,
  getAllByAuthor,
} from './piece';
import { submitToPiece, submitToReading } from './rating';

export const apiURL = 'http://localhost:8080/api/';
// export const apiURL = 'https://backend-dot-writer-205511.appspot.com/api'
let appRef = null;

// the reference to the app is set by calling this function in the app
export const setAppRef = function setAppRefForApiIndex(app) {
  appRef = app;
};

// AUTH CALLS
export const register = function register(...args) {
  registerUser(apiURL, appRef, ...args);
};

export const signIn = function signIn(...args) {
  signInUser(apiURL, appRef, ...args);
};

export const refresh = function refesh(...args) {
  refreshAuth(apiURL, appRef, ...args);
};

export const logoutUser = function logoutUser(...args) {
  logout(apiURL, appRef, ...args);
};

// PIECE CALLS
export const submitPiece = function submitPiece(...args) {
  submit(apiURL, appRef, ...args);
};

export const getPiece = function getPiece(...args) {
  get(apiURL, appRef, ...args);
};

export const getAllPieces = function getAllPieces(...args) {
  getAll(apiURL, appRef, ...args);
};

export const getUserPieces = function getUserPieces(...args) {
  getAllByAuthor(apiURL, appRef, ...args);
};

// RATING CALLS
export const submitRating = function submitRating(...args) {
  submitToPiece(apiURL, appRef, ...args);
};

export const submitReadRating = function submitReadRating(...args) {
  submitToReading(apiURL, appRef, ...args);
};
