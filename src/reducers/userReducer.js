const initialState = {
  user: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN_PENDING":
      return { ...state, user: {}, token: {}, pendingRequest: true };
    case "CREATE_USER":
      localStorage.setItem("token", action.payload.jwt);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.jwt,
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
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
        pendingRequest: false,
        error: null
      };
    case "LOG_IN":
      localStorage.setItem("token", action.payload.jwt);
      console.log("logged in");
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.jwt,
        pendingRequest: false,
        error: null
      };
    case "LOG_OUT":
      localStorage.clear();
      console.log("logged out");
      return {
        ...state,
        user: {},
        token: {},
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
