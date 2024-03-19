import React from "react";
import TopNav from "@/src/components/topNav";
import RepoProvider from "@/src/components/RepoContext";
import Header from "@/src/components/header";

export default function Projects() {
  return (
    <RepoProvider>
      <Header />
      <TopNav />
      <div className="projects">
        Coming Soon
      </div>
    </RepoProvider>
  );
}
