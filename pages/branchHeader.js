import BranchSelection from "@/src/components/branch_selection";
import SwitchBranches from "@/src/components/switch_branches";
import TagsHeader from "@/src/components/tags";
import React from "react";
const BranchHeader=()=>{
    return(
        <div className="branch-header">
            <BranchSelection/>
            <div className="sub-header">
            <SwitchBranches/>
            <TagsHeader/>
            </div>
        </div>
    )
}
export default BranchHeader;