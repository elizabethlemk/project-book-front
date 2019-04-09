//---------------------//
// D I S P A T C H
//---------------------//

export const createProject = projectObj => {
  return { type: "CREATE_PROJECT", payload: projectObj };
};

export const updateProject = projectObj => {
  return { type: "UPDATE_PROJECT", payload: projectObj };
};

export const getProject = projectObj => {
  return { type: "GET_PROJECT", payload: projectObj };
};

export const pendingProject = () => {
  return { type: "PROJECT_PENDING" };
};

export const createComment = commentObj => {
  return { type: "CREATE_COMMENT", payload: commentObj };
};

export const pendingComment = () => {
  return { type: "COMMENT_PENDING" };
};

export const createRef = linkObj => {
  return { type: "CREATE_REF", payload: linkObj };
};

export const createBoardImage = img => {
  return { type: "CREATE_IMAGE", payload: img };
};

//---------------------//
// T H U N K
//---------------------//

export const addProject = (formData, token) => {
  return dispatch => {
    dispatch(pendingProject());
    return fetch("http://localhost:4000/api/v1/projects", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ project: formData })
    })
      .then(resp => resp.json())
      .then(json => {
        dispatch(createProject(json));
      });
  };
};

export const loadProject = (projectId, token) => {
  return dispatch => {
    return fetch(`http://localhost:4000/api/v1/projects/${projectId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(json => {
        dispatch(getProject(json));
      });
  };
};

export const addComment = (formData, token) => {
  return dispatch => {
    dispatch(pendingComment());
    return fetch("http://localhost:4000/api/v1/notes", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ notes: formData })
    })
      .then(resp => resp.json())
      .then(json => {
        dispatch(createComment(json));
      });
  };
};

export const addRef = (projectId, linkObj) => {
  return dispatch => {
    return fetch(`http://localhost:4000/api/v1/links`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ links: linkObj })
    })
      .then(resp => resp.json())
      .then(json => {
        dispatch(createRef(json));
      });
  };
};

export const addBoardImage = (formData, projectId) => {
  return dispatch => {
    return fetch(`http://localhost:4000/api/v1/projects/${projectId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      },
      body: formData
    })
      .then(resp => resp.json())
      .then(json => {
        console.log(json);
        dispatch(createBoardImage(json));
      });
  };
};
