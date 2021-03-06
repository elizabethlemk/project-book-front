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
      let index = state.blogs.indexOf(
        state.blogs.find(blog => blog.id === action.payload.id)
      );
      let temp = [...state.blogs];
      temp[index] = action.payload;
      return { ...state, blogs: temp };
    default:
      return state;
  }
};

export default blogReducer;
