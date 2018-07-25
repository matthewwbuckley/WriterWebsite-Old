export const signInUser = function signInUser(apiURL, appRef, form, username, password) {
  const loginURL = `${apiURL}auth/signin`;
  fetch(loginURL, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      username,
      password,
    }),
  }).then(
    res => res.json(),
  ).then(
    (info) => {
      if (info.error) {
        form.setState({ error: info.error });
      } else {
        localStorage.setItem('token', info.token);
        appRef.setState({ redirect: true });
        // info.userId NOT info.userID <- set by JWT
        appRef.setState({
          user: { userId: info.userID, username: info.username, token: info.token },
        });
      }
    },
  );
};

export const registerUser = async function registerUser(
  apiURL,
  appRef,
  form,
  username,
  password,
  email,
) {
  const registerURL = `${apiURL}auth/register`;
  fetch(registerURL, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      username,
      password,
      email,
    }),
  }).then((res) => {
    if (res.ok) {
      signInUser(form, username, password);
      appRef.setState({ redirect: true });
    } else {
      const errorMessage = `Registration Failed. 
      - Username must be unique
      - Password must be over 8 characters long
      - Email must be unique and valid`;
      form.setState({ error: errorMessage });
    }
  });
};

export const refreshAuth = function refreshAuth(apiURL, appRef) {
  const refreshURL = `${apiURL}auth/refresh`;

  // localStorage.getItem returns string "undefined" not undefined
  let token = null;
  if (localStorage.getItem('token') !== 'undefined') {
    token = localStorage.getItem('token');
  }
  fetch(refreshURL, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      token,
    }),
  }).then(
    res => res.json(),
  ).then(
    (info) => {
      if (info.error) {
        // I think I should ne nulling out the user here
        appRef.setState({
          user: null,
        });
      } else if (info.token) {
        // info.userId NOT info.userID <- set by JWT
        appRef.setState({
          user: { userId: info.userID, username: info.username, token: info.token },
        });
      } else {
        appRef.setState({
          user: null,
        });
      }
    },
  );
};

export const logout = function logout(apiURL, appRef) {
  localStorage.token = undefined;
  appRef.setState({ user: undefined });
};
