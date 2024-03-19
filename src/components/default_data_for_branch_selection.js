import React, { useContext } from "react";
import BranchOrTagSwitchComponent from "./branch_tag_switch";
import { GitContext } from "@/pages/context";
import { fetchBranchData } from "@/pages/api/api";
import { sortedBranches, handleSelectedBranch } from "./branch_utilis";
import { accessToken } from "./branch_utilis";
const DefaultBranchesData = () => {
  const {
    branchData,
    branchSha,
    setBranchSha,
    searchQuery,
    branchSelected,
    selectedBranchName,
    selectedItem,
    setSelectedBranchName,
    setSelectedTagName,
    setSearchQuery,
    setButtonClicked,
    searchTerm,
    viewAll,
  } = useContext(GitContext);

  const sortedBranchNames = sortedBranches(branchData);
  let sortedData = viewAll ? sortedBranchNames : sortedBranchNames.slice(0, 10);
  const handleBranchSelection = (item) => {
    handleSelectedBranch(
      item,
      branchSelected,
      setBranchSha,
      setSelectedBranchName,
      branchData,
      setSelectedTagName,
      setSearchQuery,
      setButtonClicked
    );
    fetchBranchData(searchTerm, selectedBranchName, branchSha, accessToken);
  };

  return (
    <div>
      {selectedItem?.length <= 0 && !searchQuery && (
        <div>
          {sortedData?.map((branch, index) => {
            const isMasterBranch = branch === "master";
            return (
              <BranchOrTagSwitchComponent
                key={index}
                handleBranchSelection={handleBranchSelection}
                branch={branch}
                index={index}
                isMasterBranch={isMasterBranch}
                selectedBranchName={selectedBranchName}
                branchSelected={branchSelected}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DefaultBranchesData;
