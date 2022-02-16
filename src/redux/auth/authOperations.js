
// const logOut = () => async dispatch => {
//     dispatch(logoutRequest());
//     try {
//       await axios.post('/users/logout');
//       token.unset();
//       dispatch(logoutSuccess());
//     } catch (error) {
//       dispatch(logoutError(error.message));
//     }
//   };