import { createContext, useState } from "react";

// 1. Create the context
const UserContext = createContext({});

// 2. Create the provider component
const UserContextProvider = ({ children }) => {
  const [userinfo, setuserinfo] = useState({});

  return (
    <UserContext.Provider value={{ userinfo, setuserinfo }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Export both cleanly
export { UserContext, UserContextProvider };
