//---------------------//
// D I S P A T C H
//---------------------//

export const createUser = userObj => {
  return { type: "CREATE_USER", payload: userObj };
};

export const setUser = userObj => {
  return { type: "SET_USER", payload: userObj };
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

//---------------------//
// T H U N K
//---------------------//
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

export const checkToken = () => {
  return dispatch => {
    dispatch(logInPending());
    if (localStorage.token) {
      return fetch("http://localhost:4000/api/v1/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      })
        .then(resp => resp.json())
        .then(json => {
          if (json.message) {
            localStorage.removeItem("token");
          } else {
            dispatch(setUser(json));
          }
        });
    }
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
      .then(json => {
        if (!json.errors) {
          dispatch(logIn(json));
        }
      })
      .catch(error => dispatch(logInError(error)));
  };
};
