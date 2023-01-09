const CommonReducer = (state, action) => {
  switch (action) {
    case "add":
      return state + 1;
    default:
      throw new Error("Unexpected action");
  }
};

export default CommonReducer;
