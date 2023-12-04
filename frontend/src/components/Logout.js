import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useUserData } from "../context/UserDataContext";
const Logout = () => {
  const { clearUserData } = useUserData();
  const { dispatch } = useUser();
  useEffect(() => {
    fetch("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        //  dispatch1({type:"USER",payload:false})
        dispatch({ type: "CLEAR_USER" });
        clearUserData(); // Clear user data here
        navigate("/login");

        if (!res.status === 200) {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [clearUserData, dispatch]);

  const navigate = useNavigate();
  return <div>Logout</div>;
};

export default Logout;
