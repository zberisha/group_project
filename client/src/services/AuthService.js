
export const loginUser = (userId, token) => {
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("token", token);
  };
  
  export const logoutUser = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("token");
  };
  
  export const getUserId = () => sessionStorage.getItem("userId");
  export const getToken = () => sessionStorage.getItem("token");
  