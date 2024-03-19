import React from "react";
import { TiTick } from "react-icons/ti";

const BranchOrTagSwitchComponent = ({
  handleBranchSelection,
  isMasterBranch,
  branchSelected,
  selectedBranchName,
  branch,
  index,
  selectedTagName,
  tagSelected,
}) => {
  return (
    <div
      key={index}
      onClick={() =>
        handleBranchSelection(branchSelected ? branch?.name : branch)
      }
      className="branch-names"
    >
      <div>
        {(isMasterBranch && !selectedBranchName) ||
        branch?.name === selectedBranchName ||
        branch === selectedTagName ||
        ((branch?.name === "master" || branch?.name === "main") &&
          !selectedBranchName) ||
        (branch?.name === selectedBranchName && !tagSelected) ? (
          <TiTick size={16} style={{ color: "white" }} />
        ) : (
          <div style={{ width: 16, height: 16 }}></div>
        )}
      </div>

      {branchSelected ? branch?.name : branch}
      {(branch?.name === "master" || branch?.name === "main") && (
        <div className="default">default</div>
      )}
    </div>
  );
};

export default BranchOrTagSwitchComponent;
