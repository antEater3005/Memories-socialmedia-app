import {
  DELETE,
  LIKE_POST,
  UPDATE,
  CREATE,
  FETCH_ALL,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
  FETCH_BY_ID,
  COMMENT_POST,
} from '../constants/actionTypes';
export default (
  state = { isLoading: true, posts: [], comments: [] },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload };
    case FETCH_BY_ID:
      return { ...state, post: action.payload };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload._id ? action.payload : post
        ),
      };
    case LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload._id ? action.payload : post
        ),
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case COMMENT_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (action.payload._id === post._id) return action.payload;
          return post;
        }),
      };
    default:
      return state;
  }
};
