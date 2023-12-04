// import React, { createContext, useContext, useState, useEffect } from "react";
// import { useUser } from "./UserContext";
// import axios from "axios";

// // Create a context for user data
// const UserDataContext = createContext();
// // const { state } = useUser();
// //Create a provider to manage the state and provide the context
// export const UserDataProvider = ({ children }) => {
//   const { state } = useUser(); // Move useUser hook here
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // Fetch user data using axios or your preferred method
//         const response = await axios.get(`/getUserData/${state.email}`);
//         setUserData(response.data);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, [state.email]);

//   return (
//     <UserDataContext.Provider value={userData}>
//       {children}
//     </UserDataContext.Provider>
//   );
// };

// // Custom hook to access user data from the context
// export const useUserData = () => {
//   return useContext(UserDataContext);
// };
// UserDataProvider.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";
import axios from "axios";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const { state } = useUser();
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/getUserData/${state.email}`);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [state.email]);
  const clearUserData = () => {
    setUserData(null);
  };
  return (
    <UserDataContext.Provider
      value={{ userData, fetchUserData, clearUserData }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  return useContext(UserDataContext);
};
