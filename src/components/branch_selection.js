/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext, useRef } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { GitContext } from "@/pages/context";
import Search from "./search";
import FilteredItems from "./filtered_items";
import DefaultBranchesData from "./default_data_for_branch_selection";
import SelectedItemData from "./selected_item_data";
import { accessToken } from "./branch_utilis";
import {
  fetchBranchData,
  fetchBranchesDetails,
  fetchTagsData,
} from "@/pages/api/api";

const BranchSelection = () => {
  const {
    branchSha,
    setBranchSha,
    setBranchContents,
    selectedBranchName,
    branchSelected,
    viewAll,
    selectedTagName,
    branchData,
    setBranchData,
    tags,
    setTags,
    searchQuery,
    setSearchQuery,
    buttonClicked,
    setButtonClicked,
    setBranchSelected,
    setTagSelected,
    setSelectedItem,
    setViewAll,
    tagSelected,
    subContentClicked,
    searchTerm,
    repositories,
    setSelectedBranchName,
    repoSearchData,branchContents
  } = useContext(GitContext);
  const [itemSelected, setItemSelected] = useState(false);
  const [validName, setValidName] = useState(false);
  const selectOptionsRef = useRef(null);

  useEffect(() => {
    const fetchBranchesNames = async () => {
      try {
        const branchDetails = await fetchBranchesDetails(
          searchTerm,
          accessToken
        );
        if (searchTerm !== "") {
          setValidName(true);
        }
        if (Array.isArray(branchDetails)) {
          setBranchData(branchDetails);
          setSelectedBranchName(
            branchDetails.find((branch) => branch.name === "master")
              ? "master"
              : "main"
          );
          const masterBranchDetails = branchData.find(
            (branch) => branch.name === "master" || "main"
          );
          const masterBranchSha = masterBranchDetails
            ? masterBranchDetails.commit.sha
            : "";
          setBranchSha(masterBranchSha);
        } else {
          console.error("Unexpected API response:");
        }
      } catch (error) {
        console.error("Error fetching branch data:", error);
      }
    };
    fetchBranchesNames();
    const fetchTagNames = async () => {
      try {
        const allTags = await fetchTagsData(
          searchTerm,
          accessToken
        );
        setTags(allTags?.map((tag) => tag.name));
       
      } catch (error) {
        console.error("Error fetching directory data:", error);
      }
    };

    fetchTagNames();
  }, [branchSha,repositories,repoSearchData]);

  useEffect(() => {
    const fetchBranchDataa = async () => {
      const branches = await fetchBranchData(
        searchTerm,
        selectedBranchName,
        branchSha,
        accessToken
      );
      console.log({branches})
      setBranchContents([...branches]);
    };
    fetchBranchDataa();
  }, [branchSha, selectedBranchName,repositories,repoSearchData]);

  const handleSelection = () => {
    setButtonClicked(true);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectOptionsRef.current &&
        !selectOptionsRef.current.contains(event.target)
      ) {
        setButtonClicked(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCloseSelection = () => {
    setButtonClicked(false);
    setViewAll(false);
  };
  return (
    <div className="branch-selection-main-div">
      {!itemSelected  &&  (
        <div>
          <Search
            buttonClicked={buttonClicked}
            handleSelection={handleSelection}
            branchSelected={branchSelected}
            selectedBranchName={selectedBranchName}
            selectedTagName={selectedTagName}
          />
          <div className="select-options-out-div">
            {buttonClicked && !subContentClicked && (
              <div className="select-options" ref={selectOptionsRef}>
                <div className="select-header">
                  <div className="switch-branches-tags">
                    Switch branches/tags
                  </div>
                  <div className="close-icon" onClick={handleCloseSelection}>
                    <CloseOutlined size={12} color="black" />
                  </div>
                </div>
                <div className="filter-div">
                  {" "}
                  <input
                    className={searchQuery ? "input-clicked" : "filter-input"}
                    type="search"
                    placeholder={
                      tagSelected ? "Find a tag" : "Filter branches/tags"
                    }
                    onChange={handleSearch}
                  />
                </div>

                <div className="branch-tags-div">
                  <div
                    className={!tagSelected ? "branches" : "branch-selected"}
                    onClick={() => {
                      setSelectedItem(branchData);
                      setBranchSelected(true);
                      setTagSelected(false);
                    }}
                  >
                    Branches
                  </div>
                  <div
                    className={!tagSelected ? "tags" : "tag-selected"}
                    onClick={() => {
                      setSelectedItem(tags);
                      setBranchSelected(false);
                      setTagSelected(true);
                    }}
                  >
                    Tags
                  </div>
                </div>
                <FilteredItems />
                <DefaultBranchesData />
                <SelectedItemData />
                {!viewAll && (
                  <div className="view-more">
                    {branchSelected
                      ? "view all branches"
                      : tags !== "no tags"
                      ? "view all tags"
                      : ""}
                  </div>
                )}
                {viewAll && <div>coming soon</div>}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default BranchSelection;
