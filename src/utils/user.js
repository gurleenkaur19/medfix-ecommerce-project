export const checkUser = () => {
  const user = localStorage.getItem("user");
  return user;
};
