import React from "react";
import SubContent from "@/src/components/sub_content";
import Branches from "./branches";
const SubContentPage=()=>{
    return(
        <div className='main-header'>
       <Branches/>
        <SubContent/>
      </div>
    )
}
export default SubContentPage;