import React, { createContext, useState } from "react";
export const GitContext = createContext({});
const Context = ({ children }) => {
  const [branchData, setBranchData] = useState([]);
  const [selectedBranchName, setSelectedBranchName] = useState("master");
  const [selectedTagName, setSelectedTagName] = useState("");
  const [branchSha, setBranchSha] = useState("");
  const [branchContents, setBranchContents] = useState([]);
  const [tags, setTags] = useState([]);
  const [switchBranchClicked, setSwitchBranchClicked] = useState(false);
  const [directorySha, setDirectorySha] = useState("");
  const [subContentClicked, setSubContentClicked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [branchSelected, setBranchSelected] = useState(true);
  const [tagSelected, setTagSelected] = useState(false);
  const [selectedItem, setSelectedItem] = useState(branchData);
  const [viewAll, setViewAll] = useState(false);
  const [directoryData, setDirectoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [repositories, setRepositories] = useState([]);
  const repoSearchData = repositories[0];

  const contextValue = {
    selectedBranchName,
    setSelectedBranchName,
    branchData,
    setBranchData,
    branchSha,
    setBranchSha,
    selectedTagName,
    setSelectedTagName,
    tags,
    setTags,
    switchBranchClicked,
    setSwitchBranchClicked,
    branchContents,
    setBranchContents,
    directorySha,
    setDirectorySha,
    subContentClicked,
    setSubContentClicked,
    searchQuery,
    setSearchQuery,
    buttonClicked,
    setButtonClicked,
    branchSelected,
    setBranchSelected,
    tagSelected,
    setTagSelected,
    selectedItem,
    setSelectedItem,
    viewAll,
    setViewAll,
    directoryData,
    setDirectoryData,
    searchTerm,
    setSearchTerm,
    repositories,
    setRepositories,
    repoSearchData,
  };
  return (
    <div>
      <GitContext.Provider value={contextValue}>{children}</GitContext.Provider>
    </div>
  );
};
export default Context;
