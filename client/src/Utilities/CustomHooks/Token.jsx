import React, { useState } from "react";

//In this a custom hook is written so as to maintain token across client side.
function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    // const tokenJSON = JSON.parse(tokenString);
    //Using Optional Chaining Operator to not let undefined. circumstance happen
    return tokenString;
  };

  const [token, setToken] = useState(getToken());
  console.log("Inside useToken and token is ", getToken());
  const saveToken = (userToken) => {
    //Using localstorage so as to allow user logged in across windows.
    localStorage.setItem("token", userToken);
    setToken(userToken);
  };
  const removeToken = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return {
    setToken: saveToken,
    token,
    removeToken,
  };
}
export default useToken;
