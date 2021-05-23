export const setSuggest = (data) => {
  return {
    type: "SET_SUGGEST",
    payload: data,
  };
};

export const setVisiblePeople = () => {
  return {
    type: "SET_VISIBLE_PEOPLE",
  };
};
