import Footer from "@/src/components/footer";
import Header from "@/src/components/header";
import React, { useContext } from "react";
import TopNav from "@/src/components/topNav";
import RepoProvider from "@/src/components/RepoContext";
import RepoSearch from "@/src/screens/RepoSearch";
import GitHubReadme from "@/src/components/markDown";
import Branches from "./branches";
import About from "@/src/components/About";
import BranchHeader from "./branchHeader";
import BranchContents from "@/src/components/branch_contents";
import { GitContext } from "./context";

export default function Index() {
  const { searchTerm,repoSearchData } = useContext(GitContext);
  return (
    <div>
      <RepoProvider>
        <Header />
        <TopNav />
      </RepoProvider>
      {repoSearchData ? (
        <div className="main">
          <div style={{ display: "flex" }}>
            <div className="inner-code">
              <BranchHeader />
              <BranchContents />
              <GitHubReadme />
            </div>
            <div className="about">
              <RepoProvider>
                <About />
              </RepoProvider>
            </div>
          </div>
        </div>
      ) : (
        <div className="noData">Search any repo</div>
      )}
      <Footer />
    </div>
  );
}
