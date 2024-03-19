/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useContext } from "react";
import { GitContext } from "@/pages/context";
import { fetchCommits } from "@/pages/api/api";
import { accessToken } from "./branch_utilis";
const BranchTitle = () => {
  const { selectedBranchName, searchTerm, repositories } =
    useContext(GitContext);
  const [branchHeaderData, setBranchHeaderData] = useState({
    firstCommitMessage: "",
    profileName: "",
    avatar: "",
    shaFirstFiveDigits: "",
    commitCount: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allCommits = await fetchCommits(
          searchTerm,
          selectedBranchName,
          accessToken
        );
        const commitCount = allCommits.length;
        setBranchHeaderData((prevData) => ({
          ...prevData,
          commitCount,
        }));
        if (allCommits.length > 0) {
          const firstCommitMessage = allCommits[0].commit.message;
          const truncatedMessage = truncateMessage(firstCommitMessage, 100);
          const authorName = allCommits[0].commit.author.name;
          const wordsArray = authorName.split(" ");
          const profileName = wordsArray[1] ? wordsArray[1] : wordsArray;
          const avatar = allCommits[0].author.avatar_url;
          const sha = allCommits[0].sha;
          const shaFirstFiveDigits = sha.slice(0, 7);

          setBranchHeaderData((prevData) => ({
            ...prevData,
            truncatedMessage,
            profileName,
            avatar,
            shaFirstFiveDigits,
          }));
        }
      } catch (error) {
        console.error("Error fetching directory data:", error);
      }
    };

    fetchData();
  }, [selectedBranchName, searchTerm]);

  const truncateMessage = (message, maxLength) => {
    return message.length > maxLength
      ? message.substring(0, maxLength)
      : message;
  };

  return (
    <div className="branch-title">
      <div className="profileCommmit">
        {branchHeaderData.avatar && (
          <img
            src={branchHeaderData.avatar}
            alt="profile"
            width={24}
            height={24}
            className="profile"
          />
        )}
        <div className="profile-name">{branchHeaderData.profileName}</div>
        <div className="commit-data">{branchHeaderData.firstCommitMessage}</div>
        <div className="responsive-commit-data">...</div>
      </div>
      <div className="shaNoCommit">
        <div className="sha-no">{branchHeaderData.shaFirstFiveDigits} </div>
        <img
          src="/assets/clock.png"
          alt="clock"
          width={16}
          height={16}
          className="clock"
        />
        <div className="commits-count">
          <div>{branchHeaderData.commitCount}</div>
          <div className="commit">commits</div>{" "}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default BranchTitle;
