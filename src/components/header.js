import React, { useContext } from "react";
import RepoSearch from "../screens/RepoSearch";
// import { RepoContext } from "./RepoContext";
import Image from "next/image";
import Link from "next/link";
import {
  UserOutlined,
  GithubOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import { GitContext } from "@/pages/context";

const Header = () => {
  const { repoSearchData } = useContext(GitContext);

  const imageLoader = ({ src }) => src;

  const forkAndStars = [
    {
      url: "/assets/fork.svg",
      alt: "Fork",
      name: "Fork",
      count: repoSearchData?.forks_count,
      symbol: <CaretDownOutlined style={{ fontSize: "16px" }} />,
    },
    {
      url: "/assets/star.svg",
      alt: "Star",
      name: "Star",
      count: repoSearchData?.stargazers_count,
      symbol: <CaretDownOutlined style={{ fontSize: "16px" }} />,
    },
  ];

  const formatCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    } else {
      return count.toString();
    }
  };

  return (
    <div>
      <div className="header">
        <div className="icon_input_div">
          <Link href="/">
            <GithubOutlined className="githuboutlined" />
          </Link>
          <RepoSearch />
        </div>

        <div className="avatar_div">
          <Avatar
            className="avatar"
            icon={<UserOutlined className="userOutlined" />}
          />
        </div>
      </div>

      <div className="repoName_div">
        <div className="repoName">
          <Image
            className="avatar_img"
            loader={imageLoader}
            src={
              repoSearchData
                ? repoSearchData?.owner?.avatar_url
                : "/assets/save.png"
            }
            alt="avatar"
            width={24}
            height={24}
          />

          <h3 className="fullName">
            {repoSearchData ? (
              <div>
                <span>{repoSearchData?.owner?.login} </span>
                <span style={{ color: "#8B949E" }}>/</span>
                <span> {repoSearchData?.name}</span>
              </div>
            ) : (
              <div>
                <span>User </span>
                <span style={{ color: "#8B949E" }}>/</span>
                <span> Repo</span>
              </div>
            )}
          </h3>
          <p className="public">Public</p>
        </div>

        <div className="star_and_fork">
          {forkAndStars.map((forkAndStar, index) => {
            return (
              <div className="fork" key={index}>
                <div className="fork_div">
                  <Image
                    src={forkAndStar.url}
                    alt={forkAndStar.alt}
                    width={16}
                    height={16}
                  />
                  <p>{forkAndStar.name}</p>
                  <p className="count">
                    {forkAndStar.count ? formatCount(forkAndStar.count) : "0"}
                  </p>
                </div>

                <div className="symbol">
                  <p>{forkAndStar.symbol}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Header;
