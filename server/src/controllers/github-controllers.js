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
        // This will return only max 100 repositories. by default using github api.
        const response = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100`, {
            headers: {
                Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });
        // console.log(`Response of repo: ${JSON.stringify(response.data.length)}`);
        
        return response.data;
    } catch (error) {
        // console.log(`Status coode from repo: ${error.response.status}`);
        // console.log(error,"Error fetching github user repositories ----------------");
        return 0;
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
        return 0;
        
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
        return 0;
    }
}
// This will only return the max commits 100 bcz of github api default return max commits 100.
const getGithubUserCommits = async (username, repos) => {
    try {
        const commits = [];
        
        // console.log(`\nFetching commits for ${username}...`);
        // console.log(`Total repositories found: ${repos.length}`);

        for (let i = 0; i < Math.min(repos.length, 10); i++) {
            const repo = repos[i];
            if (!repo) {
                // console.log(`Skipping null repo at index ${i}`);
                continue;
            }

            // console.log(`\n🔹 Fetching commits for repository: ${repo.name}`);

            const response = await axios.get(
                `https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}&per_page=100`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
                        Accept: 'application/vnd.github.v3+json',
                    },
                    validateStatus: (status) => status >= 200 && status < 300 || status === 409,
                }
            );

            // Handle empty repository case
            if (response.status === 409) {
                // console.log(`⚠️ Repository ${repo.name} is empty (409 Conflict). Skipping...`);
                continue;
            }

            // Log API response status and commit count
            // console.log(`✅ API Response for ${repo.name}: Status ${response.status}, Commits Found: ${response.data.length}`);

            // Add commits if they exist
            if (response.data && Array.isArray(response.data)) {
                commits.push(...response.data);
            }
        }

        // console.log(`\n🎯 Total commits fetched for ${username}: ${commits.length}`);
        return commits;
    } catch (error) {
        console.log(`❌ Error fetching commits:`, error.response ? error.response.data : error.message);
        return 0;
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
        return 0;
        
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
        return "NoFav";
        
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
        const checkIsGithubUserNameLeetcodeUserName = leetcodeUsername || username;
        const checkIsLeetcodeUserNameGithubUserName = username || leetcodeUsername;

        console.log(
            `username: ${username}, leetcodeUsername: ${checkIsGithubUserNameLeetcodeUserName}`,
            "checkIsLeetcodeUserNameGithubUserName",
            checkIsLeetcodeUserNameGithubUserName
        );

        
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
const getGithubLeetcodeUserAllDataMethod = async (username, leetcodeUsername) => {
    try {
        const isUserExists = await Stats.findOne({username:username})
        if(isUserExists){
            return ({
                message: "Your data is already exists"
            })
        }
        const reposData = await getGithubUserRepositories(username);
        // console.log(`Repos data:++++++++++++++ \n \n \n  ${JSON.stringify(reposData)}`);
        
        const followersData = await getGithubUserFollowers(username);
        const followingData = await getGithubUserFollowing(username);
        const commitsData = await getGithubUserCommits(username, reposData);
        // console.log(`Commits data:--------------------------- \n \n  ${JSON.stringify(commitsData.length)}`);
        
        const pullRequestsData = await getGithubUserPullRequests(username);
        const favoriteLanguage = await getGithubUserFavLanguage(reposData);
        const leetcodeData = await getLeetcodeUserInformation(leetcodeUsername);
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
        return true
    } catch (error) {
        console.log(error);
        return false;
    }
}

export {
    getGithubUserInformation, getGithubUserRepositories, getGithubUserFollowers,
    getGithubUserFollowing, getGithubUserCommits, getGithubUserPullRequests, getGithubUserFavLanguage, getGithubUserEvents, getLeetcodeUserInformation,
    getGithubLeetcodeUserAllData,getGithubLeetcodeUserAllDataMethod
};
