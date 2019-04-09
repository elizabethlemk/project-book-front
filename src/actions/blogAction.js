//---------------------//
// D I S P A T C H
//---------------------//

export const createBlog = blogObj => {
  return { type: "CREATE_BLOG_POST", payload: blogObj };
};

export const getBlog = blogObj => {
  return { type: "GET_BLOG_POSTS", payload: blogObj };
};

//---------------------//
// T H U N K
//---------------------//

export const addBlog = blogData => {
  return dispatch => {
    return fetch("http://localhost:4000/api/v1/blog_posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ blog_post: blogData })
    })
      .then(resp => resp.json())
      .then(json => {
        dispatch(createBlog(json));
      });
  };
};

export const loadBlogs = userId => {
  return dispatch => {
    return fetch("http://localhost:4000/api/v1/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    })
      .then(resp => resp.json())
      .then(json => {
        dispatch(getBlog(json.user.blog_posts));
      });
  };
};
