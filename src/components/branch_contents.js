/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { FileOutlined } from "@ant-design/icons";
import { GitContext } from "@/pages/context";
import BranchTitle from "./branch_title";
import Link from "next/link";
import { FolderIcon, sortFilesAndFolders } from "./branch_utilis";
import { useRouter } from "next/dist/client/router";
const BranchContents = () => {
  const {
    selectedBranchName,
    setDirectorySha,
    setSelectedBranchName,
    branchContents,
    subContentClicked,
    setSubContentClicked,
    buttonClicked,
    repoSearchData
  } = useContext(GitContext);

  const router = useRouter();

  useEffect(() => {
    if (!selectedBranchName) {
      setSelectedBranchName("master");
    }
  }, []);

  const handleSubContent = async (sha, type) => {
    if (type === "dir") {
      setSubContentClicked(true);
      setDirectorySha(sha);
      localStorage.setItem(
        "selectedBranchContents",
        JSON.stringify(branchContents)
      );
      router.push(`/subContent?name=${selectedBranchName}`);
    }
  };
  const sortedBranchContents = sortFilesAndFolders(branchContents);

  return (
    <div
      className={
        !buttonClicked ? "contents-component" : "component-button-clicked"
      }
    >
      <div className="title">
        <BranchTitle />
      </div>

      <div className="branchContents">
        {repoSearchData &&
          !subContentClicked &&
          sortedBranchContents.map((content, index) => (
            <div key={index} className="branch-item">
              <div className="content-div">
                <div>
                  {content?.type === "file" ? (
                    <FileOutlined size={16} />
                  ) : (
                    <FolderIcon />
                  )}
                </div>
                {content?.type === "dir" ? (
                  <Link
                    href="/subContent"
                    className="content-name"
                    onClick={() => handleSubContent(content.sha, content.type)}
                  >
                    {content?.name}
                  </Link>
                ) : (
                  <span className="content-name">{content?.name}</span>
                )}
              </div>
              <div>
                <Link href="" className="commit-message">
                  {content?.message}
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BranchContents;
