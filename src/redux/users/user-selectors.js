const getIsLoggedIn = state => state.users.isLoggedIn;

const getUser = state => state.users.user;

const getError = state => state.users.error;

const getIsFetchingCurrent = state => state.users.isFetchingCurrentUser;

const usersSelectors = {
  getIsLoggedIn,
  getUser,
  getError,
  getIsFetchingCurrent,
};
export default usersSelectors;
