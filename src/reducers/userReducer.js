const initialState = {
  user: { projects: [], blog_posts: [] },
  allUsers: [],
  allBlogs: [],
  allProjects: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN_PENDING":
      return {
        ...state,
        user: { projects: [], blog_posts: [] },
        pendingRequest: true
      };
    case "CREATE_USER":
      localStorage.setItem("token", action.payload.jwt);
      return {
        ...state,
        user: action.payload.user,
        pendingRequest: false,
        error: null
      };

    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
        pendingRequest: false,
        error: null
      };
    case "EDIT_USER":
      return { ...state, user: action.payload.user };
    case "REMOVE_USER":
      localStorage.clear();
      const users = state.filter(user => user.id !== action.payload.user.id);
      return {
        ...state,
        user: { projects: [], blog_posts: [] },
        allUsers: users
      };
    case "UPDATE_PROJECT":
      const updatedProj = state.user.projects.filter(
        project => project.id !== action.payload.id
      );
      const allProj = state.allProjects.filter(
        project => project.id !== action.payload.id
      );
      return {
        ...state,
        user: { ...state.user, projects: [updatedProj, action.payload] },
        allProjects: [allProj, action.payload]
      };
    case "REMOVE_PROJECT":
      console.log("made it into the user reducer");
      const newProj = state.user.projects.filter(
        project => project.id !== action.payload
      );
      const newAllProj = state.allProjects.filter(
        project => project.id !== action.payload
      );
      return {
        ...state,
        user: { ...state.user, projects: newProj },
        allProjects: newAllProj
      };
    case "REMOVE_BLOG":
      const newArr = state.user.blog_posts.filter(
        blog => blog.id !== action.payload
      );
      const newBlogArr = state.allBlogs.filter(
        blog => blog.id !== action.payload
      );
      return {
        ...state,
        user: { ...state.user, blog_posts: newArr },
        allBlogs: newBlogArr
      };
    case "LOAD_ALL_USERS":
      return { ...state, allUsers: action.payload };
    case "LOAD_ALL_BLOGS":
      return { ...state, allBlogs: action.payload };
    case "LOAD_ALL_PROJECTS":
      return { ...state, allProjects: action.payload };
    case "LOG_IN":
      localStorage.setItem("token", action.payload.jwt);
      console.log("logged in");
      return {
        ...state,
        user: action.payload.user,
        pendingRequest: false,
        error: null
      };
    case "LOG_OUT":
      localStorage.clear();
      console.log("logged out");
      return {
        ...state,
        user: {},
        pendingRequest: false,
        error: null
      };
    case "LOG_IN_ERROR":
      return Object.assign({}, state, { error: action.payload });
    default:
      return state;
  }
};

export default userReducer;
