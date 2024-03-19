import React, { useContext } from "react";
import BranchOrTagSwitchComponent from "./branch_tag_switch";
import { GitContext } from "@/pages/context";
import { sortedBranches, handleSelectedBranch } from "./branch_utilis";
import { fetchBranchData } from "@/pages/api/api";
import { accessToken } from "./branch_utilis";
const FilteredItems = () => {
  const {
    branchSha,
    setBranchSha,
    selectedTagName,
    branchData,
    tags,
    searchQuery,
    branchSelected,
    selectedBranchName,
    setSelectedBranchName,
    setSelectedTagName,
    setSearchQuery,
    setButtonClicked,
    searchTerm,
    viewAll,
  } = useContext(GitContext);
  const sortedContent = sortedBranches(branchData);

  const handleBranchSelection = async (item) => {
    handleSelectedBranch(
      item,
      branchSelected,
      setBranchSha,
      setSelectedBranchName,
      branchData,
      setSelectedTagName,
      setSearchQuery,
      setButtonClicked,
      searchTerm
    );
    fetchBranchData(searchTerm, selectedBranchName, branchSha, accessToken);
  };

  const filteredItems = branchSelected
    ? sortedContent.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : Array.isArray(tags)
    ? tags.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  let filteredData = viewAll ? filteredItems : filteredItems.slice(0, 10);

  return (
    <div>
      {filteredData.length === 0 && searchQuery && (
        <div className="no-data">Nothing to show</div>
      )}
      {filteredData && searchQuery && (
        <div>
          {filteredData?.map((item, index) => (
            <BranchOrTagSwitchComponent
              key={index}
              handleBranchSelection={handleBranchSelection}
              branch={item}
              index={index}
              selectedBranchName={selectedBranchName}
              selectedTagName={selectedTagName}
              branchSelected={branchSelected}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default FilteredItems;
