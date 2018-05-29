import { apiURL, appRef } from './index';

export const registerUser = async function registerUser(form, username, password, email){
  const registerURL = apiURL + 'auth/register';
  fetch(registerURL, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      username,
      password,
      email
    })
  })
  .then((res) => {
    if(res.ok){
      signInUser(form, username, password);
      appRef.setState({redirect: true});
    } else {
      let errorMessage = `Registration Failed. 
      - Username must be unique
      - Password must be over 8 characters long
      - Email must be unique and valid`
      form.setState({error: errorMessage});
    }
  })
}

export const signInUser = function signInUser(form, username, password){
  const loginURL = apiURL + 'auth/signin';
  fetch(loginURL, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      username,
      password
    })
  })
  .then(res => res.json())
  .then((info) => {
    if(!!info.error){
      form.setState({error: info.error})
    } else {
      console.log(info)
      localStorage.setItem('token', info.token);
      appRef.setState({user: {userId:info.userID, username: info.username, token: info.token}})  //info.userId NOT info.userID <- set by JWT
    }
  })
}

export const refreshAuth = function refreshAuth(){
  if(!localStorage.getItem('token')) {

  } else {
    console.log(localStorage.token)
    const refreshURL = apiURL + 'auth/refresh'
    fetch(refreshURL,{
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        token: localStorage.getItem('token')
      })
    })
    .then((res) => res.json())
    .then((info) => {
      if(!!info.error){

      } else {
        appRef.setState({user: {userId:info.userID, username: info.username, token: info.token}})  //info.userId NOT info.userID <- set by JWT
      }
    })
    .catch(function(err){
      console.log(err);
    })
  }
  
}

export const logout = function logout(){
  localStorage.token = undefined;
  appRef.setState({user: undefined});
}