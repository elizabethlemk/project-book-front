//---------------------//
// D I S P A T C H
//---------------------//

const createUser = userObj => {
  return { type: "CREATE_USER", payload: userObj };
};

const editUser = userObj => {
  return { type: "EDIT_USER", payload: userObj };
};

const setUser = userObj => {
  return { type: "SET_USER", payload: userObj };
};

const removeUser = userObj => {
  return { type: "REMOVE_USER", payload: userObj };
};

const loadAllUsers = users => {
  return { type: "LOAD_ALL_USERS", payload: users };
};

const loadAllBlogs = blogs => {
  return { type: "LOAD_ALL_BLOGS", payload: blogs };
};

const loadAllProjects = projects => {
  return { type: "LOAD_ALL_PROJECTS", payload: projects };
};

const logIn = userObj => {
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

export const updateUser = (id, formData) => {
  return dispatch => {
    return fetch(`http://localhost:4000/api/v1/users/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      },
      body: formData
    })
      .then(resp => resp.json())
      .then(json => {
        dispatch(editUser(json));
      });
  };
};

export const deleteUser = id => {
  return dispatch => {
    return fetch(`http://localhost:4000/api/v1/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    }).then(user => dispatch(removeUser(user)));
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

export const getAllUsers = () => {
  return dispatch => {
    return fetch("http://localhost:4000/api/v1/users")
      .then(resp => resp.json())
      .then(json => dispatch(loadAllUsers(json)));
  };
};

export const getAllBlogs = () => {
  return dispatch => {
    return fetch("http://localhost:4000/api/v1/blog_posts")
      .then(resp => resp.json())
      .then(json => dispatch(loadAllBlogs(json)));
  };
};

export const getAllProjects = () => {
  return dispatch => {
    return fetch("http://localhost:4000/api/v1/projects")
      .then(resp => resp.json())
      .then(json => dispatch(loadAllProjects(json)));
  };
};
