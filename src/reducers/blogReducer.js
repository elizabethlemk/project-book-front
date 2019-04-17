const initialState = {
  blogs: []
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BLOG_POSTS":
      return { ...state, blogs: action.payload };
    case "CREATE_BLOG_POST":
      return { ...state, blogs: [...state.blogs, action.payload.blog_post] };
    case "REMOVE_BLOG":
      const newArr = state.blogs.filter(blog => blog.id !== action.payload);
      return { ...state, blogs: newArr };
    case "EDIT_BLOG":
      const index = state.blogs.indexOf(
        state.blogs.find(blog => blog.id == action.payload.id)
      );
      state.blogs[index] = action.payload;
      return { ...state, blogs: state.blogs };
    default:
      return state;
  }
};

export default blogReducer;
