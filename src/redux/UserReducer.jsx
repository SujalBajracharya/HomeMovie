const initialData = { 
  users: [] 
};

const userReducer = (state = initialData, action) => {
  switch (action.type) {
    case "REGISTER":
      return {
        ...state,
        users: [
          ...state.users,
          {
            username: action.username,
            email: action.email,
            password: action.password
          }
        ]
      };

    default:
      return state;
  }
};

export default userReducer;
