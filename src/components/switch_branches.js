import React, { useContext } from "react";
import { GitContext } from "@/pages/context";
import { useRouter } from "next/router";
import { MasterIcon } from "./branch_utilis";

const SwitchBranches = () => {
  const { branchData } = useContext(GitContext);
  const router = useRouter();

  return (
    <div className="switch-branches">
      <MasterIcon />
      <span className="branch-length">{branchData.length}</span>
      <span className="branch-name">branches</span>
    </div>
  );
};
export default SwitchBranches;
