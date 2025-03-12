export const loginUser = (userId, token) => {
  sessionStorage.setItem("userId", userId);
  sessionStorage.setItem("token", token);
  window.dispatchEvent(new Event("authChange"));
};

export const logoutUser = () => {
  sessionStorage.removeItem("userId");
  sessionStorage.removeItem("token");
  window.dispatchEvent(new Event("authChange"));
};

export const getUserId = () => sessionStorage.getItem("userId");
export const getToken = () => sessionStorage.getItem("token");
