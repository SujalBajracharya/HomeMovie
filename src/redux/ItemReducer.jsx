const initialData = {
  movies: [],
};

const itemReducer = (state = initialData, action) => {
  switch (action.type) {
    case "LOAD_DB":
      return {
        movies:action.payload
      };
    default:
      return state;
  }
};

export default itemReducer;
