const initialData = { 
  users: [],
  loggedInUser: {}
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

    case "LOGIN": {
      // action.payload should be { usernameOrEmail, password }
      const { usernameOrEmail, password } = action.payload || {};
      const user = state.users.find(
        (u) => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password
      );
      if (!user) return state;
      // store only non-sensitive info
      return { ...state, loggedInUser: { username: user.username, email: user.email } };
    }

    case "LOGOUT":
      return { ...state, loggedInUser: {} };

    default:
      return state;
  }
};

export default userReducer;
