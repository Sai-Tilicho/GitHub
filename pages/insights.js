import RepoProvider from "@/src/components/RepoContext";
import Header from "@/src/components/header";
import TopNav from "@/src/components/topNav";
import React from "react";

export default function Insights() {
  return (
    <RepoProvider>
      <Header />
      <TopNav />
      <div className="insights">
        Coming Soon
      </div>
    </RepoProvider>
  );
}
