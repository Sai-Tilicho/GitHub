/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { fetchReadme } from "@/pages/api/api";
import rehypeRaw from "rehype-raw";
import { accessToken } from "./branch_utilis";
import { GitContext } from "@/pages/context";

const GitHubReadme = () => {
  const [readmeContent, setReadmeContent] = useState("");
  const { searchTerm, repositories } = useContext(GitContext);
  useEffect(() => {
    const fetch = async () => {
      const readmeData = await fetchReadme(searchTerm, accessToken);
      setReadmeContent(readmeData);
    };

    fetch();
  }, [repositories]);

  return (
    <div>
      {readmeContent && (
        <section className="readMeSection">
          <div style={{ width: "100%" }}>
            <div className="readMeHead">
              <div className="innerReadMD">
                <Image
                  src="/assets/List.svg"
                  width={16}
                  height={16}
                  alt="List"
                />
                <div className="readMeHeading">README.md </div>
              </div>
            </div>

            <ReactMarkdown
              // children={readmeContent}
              className="readmeContent"
              rehypePlugins={[rehypeRaw]}
              style={{ width: "100%" }}
            >{readmeContent}</ReactMarkdown>
          </div>
        </section>
      )}
    </div>
  );
};

export default GitHubReadme;
