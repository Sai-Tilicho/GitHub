import axios from "axios";

const fetchLatestReleaseData = async (
  fullName,
  accessToken,
  perPage = 100
) => {
  try {
    const headers = {
      Authorization: `token ${accessToken}`,
    };
    const allReleases = [];
    let page = 1;

    while (true) {
      const response = await axios.get(
        `https://api.github.com/repos/${fullName}/releases`,
        {
          params: {
            page,
            per_page: perPage,
          },
          headers,
        }
      );

      const ReleasesData = response.data;
      if (ReleasesData.length === 0) {
        break;
      }

      allReleases.push(...ReleasesData);
      page++;
    }

    if (allReleases.length > 0) {
      return {
        releaseCount: allReleases.length,
        latestRelease: allReleases[0],
      };
    } else {
      return {
        releaseCount: 0,
        latestRelease: null,
      };
    }
  } catch (error) {
    console.error("Error fetching directory data:", error);
    return {
      releaseCount: 0,
      latestRelease: null,
    };
  }
};



const fetchContributors = async (
  fullName,
  accessToken,
  perPage = 100
) => {
  try {
    const headers = {
      Authorization: `token ${accessToken}`,
    };
    const allContributors = [];
    let page = 1;

    while (true) {
      const response = await axios.get(
        `https://api.github.com/repos/${fullName}/contributors`,
        {
          params: {
            page,
            per_page: perPage,
          },
          headers,
        }
      );

      const contributorsData = response.data;
      if (contributorsData.length === 0) {
        break;
      }

      allContributors.push(...contributorsData);
      page++;
    }

    return allContributors;
  } catch (error) {
    console.error("Error fetching directory data:", error);
    return [];
  }
};

const fetchProgressData = async (fullName, accessToken) => {
  try {
    const headers = {
      Authorization: `token ${accessToken}`,
    };
    const response = await axios.get(
      `https://api.github.com/repos/${fullName}/languages`,
      {
        headers,
      }
    );
    const data = response.data;
    const totalSize = Object.values(data).reduce((acc, val) => acc + val, 0);
    const progress = Object.keys(data).map((language, index) => ({
      language,
      percentage: (data[language] / totalSize) * 100,
      color: index === 0 ? "#3572A5" : index === 1 ? "#89E051" : "#FFC107",
    }));
    return progress;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const fetchReadme = async (fullRepoName, accessToken) => {
  try {
    const headers = {
      Authorization: `token ${accessToken}`,
    };
    const response = await fetch(
      `https://api.github.com/repos/${fullRepoName}/readme`,
      {
        headers,
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to fetch README: ${errorMessage}`);
    }

    const data = await response.json();
    if (!data.content) {
      throw new Error("README content not found");
    }

    const decodedContent = decodeBase64(data.content);

    return decodedContent;
  } catch (error) {
    console.error("Error fetching README:", error);
    return null;
  }
};

const decodeBase64 = (input) => {
  try {
    const decoded = atob(input);
    return decoded;
  } catch (error) {
    console.error("Base64 decoding error:", error);
    return null;
  }
};
{
  fetchReadme;
}

const fetchBranchesDetails = async (fullName, accessToken) => {
  try {
    const headers = {
      Authorization: `token ${accessToken}`,
    };
    const response = await axios.get(
      `https://api.github.com/repos/${fullName}/branches`,
      {
        headers,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching directory data:", error);
    return [];
  }
};

const fetchTagsData = async (
  fullName,
  accessToken,
  perPage = 100
) => {
  try {
    const headers = {
      Authorization: `token ${accessToken}`,
    };
    const allTags = [];
    let page = 1;

    while (true) {
      const response = await axios.get(
        `https://api.github.com/repos/${fullName}/tags`,
        {
          params: {
            page,
            per_page: perPage,
          },
          headers,
        }
      );

      const tagsData = response.data;
      if (tagsData.length === 0) {
        break;
      }

      allTags.push(...tagsData);
      page++;
    }

    return allTags;
  } catch (error) {
    console.error("Error fetching directory data:", error);
    return [];
  }
};
const fetchCommits = async (
  fullName,
  selectedBranchName,
  accessToken,
  perPage = 100
) => {
  try {
    const headers = {
      Authorization: `token ${accessToken}`,
    };
    const allCommits = [];
    let page = 1;

    while (true) {
      const response = await axios.get(
        `https://api.github.com/repos/${fullName}/commits`,
        {
          params: {
            sha: selectedBranchName,
            page,
            per_page: perPage,
          },
          headers,
        }
      );

      const commitsData = response.data;
      if (commitsData.length === 0) {
        break;
      }

      allCommits.push(...commitsData);
      page++;
    }

    return allCommits;
  } catch (error) {
    console.error("Error fetching directory data:", error);
    return [];
  }
};

const fetchDirectoryData = async (fullName, directorySha, accessToken) => {
  try {
    const headers = {
      Authorization: `token ${accessToken}`,
    };
    const response = await axios.get(
      `https://api.github.com/repos/${fullName}/git/trees/${directorySha}`,
      {
        headers,
      }
    );
    const paths = response.data.tree.map((item) => ({
      name: item.path,
      type: item.type,
    }));
    return paths;
  } catch (error) {
    console.error("Error fetching directory data:", error);
    return [];
  }
};

const fetchBranchData = async (
  fullName,
  selectedBranchName,
  branchSha,
  accessToken
) => {
  try {
    const headers = {
      Authorization: `token ${accessToken}`,
    };
    const response = await axios.get(
      `https://api.github.com/repos/${fullName}/contents?ref=${selectedBranchName}`,
      {
        headers,
      }
    );

    const res = await Promise.all(
      response.data.map(async (branch) => {

        return axios.get(
          `https://api.github.com/repos/${fullName}/commits?path=${branch.path}&sha=${branchSha}`,
          {
            headers,
          }
        );
      })
    )
    const branches = res.map((commitResponse, index) => {
      const commitMessage =
        commitResponse.data[0]?.commit.message || "No commit message";
      const truncatedMessage = truncateMessage(commitMessage, 50);
      return {
        name: response.data[index].name,
        type: response.data[index].type,
        message: truncatedMessage,
        sha: response.data[index].sha,
      };
    })

    return branches;
  } catch (error) {
    console.error("Error fetching branches data:", error);
    return [];
  }
};

const truncateMessage = (message, maxLength) => {
  return message.length > maxLength ? message.substring(0, maxLength) : message;
};

export {
  fetchDirectoryData,
  fetchBranchData,
  fetchCommits,
  fetchTagsData,
  fetchBranchesDetails,
  fetchReadme,
  fetchProgressData,
  fetchContributors,
  fetchLatestReleaseData,
};
