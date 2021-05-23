const initialSuggest = {
  suggestData: "",
  loadSuggest: false,
};

const suggestReducer = (state = initialSuggest, action) => {
  switch (action.type) {
    case "SET_SUGGEST":
      return {
        suggestData: action.payload,
        loadSuggest: true,
      };
    case "SET_VISIBLE_PEOPLE":
      return {
        suggestData: "",
        loadSuggest: false,
      };
    default:
      return state;
  }
};

export default suggestReducer;
