const initialState = {
  blogs: []
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BLOG_POSTS":
      return { ...state, blogs: action.payload };
    case "CREATE_BLOG_POST":
      return { ...state, blogs: [...state.blogs, action.payload.blog_post] };
    default:
      return state;
  }
};

export default blogReducer;
