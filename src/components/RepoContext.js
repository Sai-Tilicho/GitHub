import React, { createContext, useState } from "react";

export const RepoContext = createContext();

const RepoProvider = ({ children }) => {
  return <RepoContext.Provider value={{}}>{children}</RepoContext.Provider>;
};

export default RepoProvider;
