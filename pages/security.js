import React from "react";
import TopNav from "@/src/components/topNav";
import RepoProvider from "@/src/components/RepoContext";
import Header from "@/src/components/header";

export default function Security() {
  return (
    <RepoProvider>
      <Header />
      <TopNav />
      <div className="security">
        Coming Soon
      </div>
    </RepoProvider>
  );
}
