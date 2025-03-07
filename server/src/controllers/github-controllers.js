import axios from 'axios';
import Stats from '../models/stats-model.js';
const getGithubUserInformation = async (username) => {
    try {

        const response = await axios.get(`https://api.github.com/users/${username}`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching github user information");
    }
}

const getGithubUserRepositories = async (username) => {
    try {

        const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching github user repositories");
    }
}
const getGithubUserFollowers = async (username) => {
    try {

        const response = await axios.get(`https://api.github.com/users/${username}/followers`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching github user followers");
    }
}
const getGithubUserFollowing = async (username) => {
    try {

        const response = await axios.get(`https://api.github.com/users/${username}/following`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching github user following");
    }
}

// const getGithubUserCommits = async (username, repos) => {
//     try {
//         const commits = [];
//         for (let i = 0; i < Math.min(repos.length, 10); i++) {
//             const repo = repos[i];
//             if (!repo) {
//                 continue;
//             }

//             const response = await axios.get(`https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}&per_page=100`, {
//                 headers: {
//                     Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
//                     Accept: 'application/vnd.github.v3+json',
//                 },
//             });

//             if (response.status === 409) {
//                 return [];
//             }

//             for (const commit of response.data) {
//                 commits.push(commit);
//             }
//         }
//         return commits;
//     } catch (error) {
//         console.log(error);
//         throw new Error("Error fetching github user commits");
//     }
// };
const getGithubUserCommits = async (username, repos) => {
    try {
        const commits = [];
        for (let i = 0; i < Math.min(repos.length, 10); i++) {
            const repo = repos[i];
            if (!repo) {
                continue;
            }

            const response = await axios.get(
                `https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}&per_page=100`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
                        Accept: 'application/vnd.github.v3+json',
                    },
                    // Allow 409 as a successful response
                    validateStatus: (status) => status >= 200 && status < 300 || status === 409,
                }
            );

            // Handle empty repository case
            if (response.status === 409) {
                console.log(`Repository ${username}/${repo.name} is empty. Skipping...`);
                continue; // Skip to the next repo
            }

            // Add commits if they exist
            if (response.data && Array.isArray(response.data)) {
                commits.push(...response.data);
            }
        }
        return commits;
    } catch (error) {
        // Log detailed error information
        if (error.response) {
            console.error(`GitHub API error: ${error.response.status} - ${error.response.data.message}`);
            throw new Error(`Failed to fetch commits for ${username}: ${error.response.data.message}`);
        } else if (error.request) {
            console.error('No response received from GitHub API:', error.request);
            throw new Error('No response from GitHub API');
        } else {
            console.error('Error in request setup:', error.message);
            throw new Error(`Error fetching commits: ${error.message}`);
        }
    }
};
const getGithubUserPullRequests = async (username) => {
    try {
        const response = await axios.get(`https://api.github.com/search/issues?q=author:${username}+is:pr`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });
        return response.data.items;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to get user pull request');
    }

}

const getGithubUserFavLanguage = async (repos) => {
    try {
        const languageCounts = {};
        for (const repo of repos) {
            if (repo.language && repo.language !== 'null' && repo.language !== 'undefined') {
                languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
            }
        }
        const favoriteLanguage =
            Object.entries(languageCounts).length > 0 ? Object.entries(languageCounts).reduce((a, b) => (a[1] > b[1] ? a : b))[0] : 'Unknown';
        return favoriteLanguage;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching github user favorite language");
    }
}

const getGithubUserEvents = async (username) => {
    try {
        const response = await axios.get(`https://api.github.com/users/${username}/events?per_page=100`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching github user events");
    }
};

const getLeetcodeUserInformation = async (leetcodeUsername) => {
    try {
        const response = await axios.get(`https://leetcode-stats-api.herokuapp.com/${leetcodeUsername}`);
        return response;
    } catch (error) {
        console.log(error);
        throw new Error("Error fetching leetcode user information");
    }
}
// TODO: Need to fix issue of not found github user and leetcode
const getGithubLeetcodeUserAllData = async (req, res) => {
    try {
        const { username, leetcodeUsername } = req.body;
        const checkIsGithubUserNameLeetcodeUserName = leetcodeUsername === undefined ? username : leetcodeUsername;
        console.log(`username: ${username}, leetcodeUsername: ${checkIsGithubUserNameLeetcodeUserName}`);
        
        const isUserExists = await Stats.findOne({username:username})
        if(isUserExists){
            return res.status(200).send({
                message: "Your data is already exists"
            })
        }
        const reposData = await getGithubUserRepositories(username);
        const followersData = await getGithubUserFollowers(username);
        const followingData = await getGithubUserFollowing(username);
        const commitsData = await getGithubUserCommits(username, reposData);
        const pullRequestsData = await getGithubUserPullRequests(username);
        const favoriteLanguage = await getGithubUserFavLanguage(reposData);
        const leetcodeData = await getLeetcodeUserInformation(checkIsGithubUserNameLeetcodeUserName);
        const stats = await Stats.create({
            username: username,
            followers: followersData.length,
            following: followingData.length,
            contributions: commitsData.length,
            commits: commitsData.length,
            pullRequests: pullRequestsData.length,
            leetcode: leetcodeData.data,
            favoriteLanguage: favoriteLanguage,
        })
        return res.status(200).send({
            message: "Github leetcode user all data fetched successfully",
            stats: stats
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error fetching github leetcode user all data",
            error: error.message
        })
    }
}

export {
    getGithubUserInformation, getGithubUserRepositories, getGithubUserFollowers,
    getGithubUserFollowing, getGithubUserCommits, getGithubUserPullRequests, getGithubUserFavLanguage, getGithubUserEvents, getLeetcodeUserInformation,
    getGithubLeetcodeUserAllData

};
