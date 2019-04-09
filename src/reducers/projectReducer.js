const initialState = {
  project: {},
  comments: [],
  links: [],
  images: [],
  pendingRequest: false,
  error: null
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PROJECT_PENDING":
      return { ...state, project: {}, pendingRequest: true };
    case "CREATE_PROJECT":
      return { ...state, pendingRequest: false, error: null };
    case "UPDATE_PROJECT":
      return {
        ...state,
        project: action.payload.project,
        pendingRequest: false,
        error: null
      };
    case "GET_PROJECT":
      return {
        ...state,
        project: action.payload.project,
        links: action.payload.project.links,
        comments: action.payload.project.notes,
        pendingRequest: false,
        error: null
      };
    case "CREATE_COMMENT":
      return {
        ...state,
        comments: [...state.comments, action.payload.note],
        pendingRequest: false,
        error: null
      };
    case "COMMENT_PENDING":
      return { ...state, pendingRequest: true };
    case "CREATE_REF":
      return { ...state, links: [...state.links, action.payload.link] };
    case "CREATE_IMAGE":
      console.log([action.payload.images]);
      return { ...state, images: [action.payload.images] };
    default:
      return state;
  }
};

export default projectReducer;
