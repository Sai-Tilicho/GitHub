import React, { useContext } from "react";
import Image from "next/image";
import { GitContext } from "@/pages/context";
const TagsHeader = () => {
  const { tags } = useContext(GitContext);
  return (
    <div className="switch-branches">
      <Image
        src="/assets/tag.png"
        alt="master-icon"
        width={16}
        height={16}
        className="tag-icon"
      />
      <span className="tag-length">{tags.length}</span>
      <span className="tag-heading">tags</span>
    </div>
  );
};
export default TagsHeader;
