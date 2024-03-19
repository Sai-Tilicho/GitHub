/* eslint-disable @next/next/no-img-element */
const handleSelectedBranch = (
  item,
  branchSelected,
  setBranchSha,
  setSelectedBranchName,
  branchData,
  setSelectedTagName,
  setSearchQuery,
  setButtonClicked
) => {
  if (branchSelected) {
    setSelectedBranchName(item);
    const selectedBranchDetails = branchData?.find(
      (branch) => branch?.name === item
    );
    const selectedBranchSha = selectedBranchDetails
      ? selectedBranchDetails?.commit.sha
      : "";
    if (!selectedBranchSha && item === "master") {
      setBranchSha();
    } else {
      selectedBranchSha;
    }
    setButtonClicked(false);
    setSearchQuery("");
  }
};

const sortedBranches = (branchData) => {
  const branches = branchData ?? [];
  const masterOrMainBranch = branches.find(
    (branch) => branch.name === "master" || branch.name === "main"
  );
  const remainingBranches = branches.filter(
    (branch) => branch.name !== "master" && branch.name !== "main"
  );

  return [
    masterOrMainBranch,
    ...remainingBranches.sort((a, b) => a.name.localeCompare(b.name)),
  ].filter((branch) => branch);
};



const FolderIcon = ({ width = 16, height = 16 }) => {
  return (
    <img
      src="/assets/folder-icon.png"
      alt="folder-icon"
      width={width}
      height={height}
    />
  );
};

const MasterIcon = ({ width = 16, height = 16 }) => {
  return (
    <img
      src="/assets/Frame.png"
      alt="master-icon"
      width={width}
      height={height}
    />
  );
};

const sortFilesAndFolders = (contents) => {
  return contents.sort((a, b) => {
    const aIsFile = a.type === "file";
    const bIsFile = b.type === "file";
    if (aIsFile && !bIsFile) return 1;
    if (!aIsFile && bIsFile) return -1;
    return 0;
  });
};

const accessToken = process.env.NEXT_PUBLIC_API_KEY

export {
  sortedBranches,
  handleSelectedBranch,
  FolderIcon,
  MasterIcon,
  sortFilesAndFolders,
  accessToken,
};
