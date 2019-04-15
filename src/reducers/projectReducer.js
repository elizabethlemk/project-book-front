const initialState = {
  project: {},
  colors: [],
  comments: [],
  links: [],
  images: []
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_PROJECT":
      return {
        ...state,
        project: action.payload.project,
        colors: action.payload.project.colors,
        links: action.payload.project.links,
        images: action.payload.project.images,
        comments: action.payload.project.notes
      };
    case "UPDATE_PROJECT":
      return {
        ...state,
        project: action.payload.project,
        colors: action.payload.project.colors,
        links: action.payload.project.links,
        images: action.payload.project.images,
        comments: action.payload.project.notes
      };
    case "GET_PROJECT":
      return {
        ...state,
        project: action.payload.project,
        colors: action.payload.project.colors,
        links: action.payload.project.links,
        images: action.payload.project.images,
        comments: action.payload.project.notes
      };
    case "CREATE_COMMENT":
      return {
        ...state,
        comments: [...state.comments, action.payload.note]
      };
    case "CREATE_REF":
      return {
        ...state,
        links: [...state.links, action.payload.link]
      };
    case "CREATE_IMAGE":
      return {
        ...state,
        images: [...state.images, action.payload.project.images]
      };
    case "ADD_COLOR":
      return {
        ...state,
        project: action.payload.color.project,
        colors: action.payload.color.project.colors,
        links: action.payload.color.project.links,
        images: action.payload.color.project.images,
        comments: action.payload.color.project.notes
      };
    default:
      return state;
  }
};

export default projectReducer;
