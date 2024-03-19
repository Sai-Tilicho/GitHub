import React from "react";
import TopNav from "@/src/components/topNav";
import Header from "@/src/components/header";
import RepoProvider from "@/src/components/RepoContext";

export default function Actions() {
  return (
    <RepoProvider>
      <Header />
      <TopNav />
      <div className="actions">
        Coming Soon
      </div>
    </RepoProvider>
  );
}
