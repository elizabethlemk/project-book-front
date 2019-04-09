// Dispatch
export const createUser = userObj => {
  return { type: "CREATE_USER", payload: userObj };
};

export const setUser = userObj => {
  return { type: "SET_USER", payload: userObj };
};

export const setToken = token => {
  return { type: "SET_TOKEN", payload: token };
};

export const logIn = userObj => {
  return { type: "LOG_IN", payload: userObj };
};

export const logOut = () => {
  return { type: "LOG_OUT" };
};

export const logInPending = () => {
  return { type: "LOG_IN_PENDING" };
};

export const logInError = error => {
  return { type: "LOG_IN_ERROR", payload: error };
};

// Thunk
export const addUser = formData => {
  return dispatch => {
    dispatch(logInPending());
    return fetch("http://localhost:4000/api/v1/users", {
      method: "POST",
      body: formData
    })
      .then(resp => resp.json())
      .then(json => {
        dispatch(createUser(json));
      });
  };
};

export const checkToken = token => {
  return dispatch => {
    dispatch(logInPending());
    dispatch(setToken(token));
    return fetch("http://localhost:4000/api/v1/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(resp => resp.json())
      .then(json => dispatch(setUser(json)));
  };
};

export const getAuth = userInfo => {
  return dispatch => {
    dispatch(logInPending());
    return fetch("http://localhost:4000/api/v1/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({ user: userInfo })
    })
      .then(resp => resp.json())
      .then(json => dispatch(logIn(json)))
      .catch(error => dispatch(logInError(error)));
  };
};
