export const setTrailer = (embedd) => {
  return {
    type: "SET_TRAILER",
    payload: embedd,
  };
};

export const setVisible = () => {
  return {
    type: "SET_VISIBLE",
  };
};
