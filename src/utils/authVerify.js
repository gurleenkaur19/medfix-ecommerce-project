export const authorizationService = (token, isAdmin) => {
  if (token && isAdmin) {
    return true;
  } else {
    return false;
  }
};
