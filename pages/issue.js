import React from "react";
import TopNav from "@/src/components/topNav";
import RepoProvider from "@/src/components/RepoContext";
import Header from "@/src/components/header";

export default function Issues() {
  return (
    <RepoProvider>
      <Header />
      <TopNav />
      <div className="issue">
        Coming Soon
      </div>
    </RepoProvider>
  );
}
