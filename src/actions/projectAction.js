//---------------------//
// D I S P A T C H
//---------------------//

const createProject = projectObj => {
  return { type: "CREATE_PROJECT", payload: projectObj };
};

export const resetProject = () => {
  return { type: "REMOVE_PROJECT" };
};

export const updateProject = projectObj => {
  return { type: "UPDATE_PROJECT", payload: projectObj };
};

const updateProjectTitle = projectObj => {
  return { type: "UPDATE_TITLE", payload: projectObj };
};
const getProject = projectObj => {
  return { type: "GET_PROJECT", payload: projectObj };
};

const createComment = commentObj => {
  return { type: "CREATE_COMMENT", payload: commentObj };
};

const deleteComment = noteId => {
  return { type: "DELETE_COMMENT", payload: noteId };
};

const createRef = linkObj => {
  return { type: "CREATE_REF", payload: linkObj };
};

export const createBoardImage = images => {
  return { type: "CREATE_IMAGE", payload: images };
};

const removeImage = imgId => {
  return { type: "REMOVE_IMAGE", payload: imgId };
};

export const removeColor = color => {
  return { type: "REMOVE_COLOR", payload: color };
};

const newColor = color => {
  return { type: "ADD_COLOR", payload: color };
};

//---------------------//
// T H U N K
//---------------------//

export const addProject = formData => {
  return dispatch => {
    return fetch("http://localhost:4000/api/v1/projects", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
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

export const loadProject = projectId => {
  return dispatch => {
    return fetch(`http://localhost:4000/api/v1/projects/${projectId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(json => {
        dispatch(getProject(json));
      });
  };
};

export const addComment = formData => {
  return dispatch => {
    return fetch("http://localhost:4000/api/v1/notes", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
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
        dispatch(createBoardImage(json));
      });
  };
};

export const deleteBoardImage = (projectId, imgId) => {
  return dispatch => {
    return fetch(
      `http://localhost:4000/api/v1/projects/${projectId}/images/${imgId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      }
    ).then(resp => dispatch(removeImage(imgId)));
  };
};

export const changeCompleted = (toggleInfo, projectId) => {
  return dispatch => {
    return fetch(`http://localhost:4000/api/v1/projects/${projectId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({ completed: toggleInfo })
    })
      .then(resp => resp.json())
      .then(json => dispatch(getProject(json)));
  };
};

export const addColor = projectId => {
  return dispatch => {
    return fetch(`http://localhost:4000/api/v1/colors`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({ color_hex: "white", project_id: projectId })
    })
      .then(resp => resp.json())
      .then(json => dispatch(newColor(json)));
  };
};

export const updateColor = (id, color) => {
  return dispatch => {
    return fetch(`http://localhost:4000/api/v1/colors/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({ color_hex: color })
    });
  };
};

export const deleteColor = id => {
  return dispatch => {
    return fetch(`http://localhost:4000/api/v1/colors/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    }).then(resp => dispatch(removeColor(id)));
  };
};

export const removeComment = id => {
  return dispatch => {
    return fetch(`http://localhost:4000/api/v1/notes/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    }).then(resp => dispatch(deleteComment(id)));
  };
};

export const updateTitle = (newTitle, projectId) => {
  return dispatch => {
    return fetch(`http://localhost:4000/api/v1/projects/${projectId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({ title: newTitle })
    })
      .then(resp => resp.json())
      .then(json => {
        dispatch(updateProjectTitle(json));
      });
  };
};
