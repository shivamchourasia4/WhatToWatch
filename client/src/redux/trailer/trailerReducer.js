const initialEmbedd = {
  embedd: "",
  loadTrailer: false,
};

const trailerReducer = (state = initialEmbedd, action) => {
  switch (action.type) {
    case "SET_TRAILER":
      return {
        embedd: action.payload,
        loadTrailer: true,
      };
    case "SET_VISIBLE":
      return {
        embedd: "",
        loadTrailer: false,
      };
    default:
      return state;
  }
};

export default trailerReducer;
