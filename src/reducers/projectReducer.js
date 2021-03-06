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
    case "REMOVE_PROJECT":
      return {
        project: {},
        colors: [],
        comments: [],
        links: [],
        images: []
      };
    case "CREATE_COMMENT":
      return {
        ...state,
        comments: [...state.comments, action.payload.note]
      };
    case "EDIT_NOTE":
      // debugger;
      let temp = state.comments.filter(
        note => note.id !== action.payload.note.id
      );
      let updatedArr = [...temp, action.payload.note];
      updatedArr.sort((a, b) => a.idx - b.idx);
      console.log(updatedArr);
      return { ...state, comments: updatedArr };

    case "DELETE_COMMENT":
      const newArr = state.comments.filter(
        comment => comment.id !== action.payload
      );
      return {
        ...state,
        comments: newArr
      };
    case "CREATE_REF":
      return {
        ...state,
        links: [...state.links, action.payload.link]
      };
    case "CREATE_IMAGE":
      return {
        ...state,
        project: action.payload.project,
        colors: action.payload.project.colors,
        links: action.payload.project.links,
        images: action.payload.project.images,
        comments: action.payload.project.notes
      };
    case "REMOVE_IMAGE":
      const newImgs = state.images.filter(image => image.id !== action.payload);
      return {
        ...state,
        images: newImgs,
        project: { ...state.project, images: newImgs }
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
    case "REMOVE_COLOR":
      const newColors = state.colors.filter(
        color => color.id !== action.payload
      );
      return {
        ...state,
        colors: newColors
      };
    case "LOG_OUT":
      return {
        project: {},
        colors: [],
        comments: [],
        links: [],
        images: []
      };
    default:
      return state;
  }
};

export default projectReducer;
