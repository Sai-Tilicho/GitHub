import RepoProvider from "@/src/components/RepoContext";
import Header from "@/src/components/header";
import TopNav from "@/src/components/topNav";
import React from "react";

export default function Discussion() {
  return (
    <RepoProvider>
      <Header />
      <TopNav />
      <div className="discussion">
        Coming Soon
      </div>
    </RepoProvider>
  );
}
