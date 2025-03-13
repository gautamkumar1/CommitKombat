import Rank from "../models/rank-model.js";
import Stats from "../models/stats-model.js";
import { generateRoastMessageMethod } from "./ai-controller.js";
import { getGithubLeetcodeUserAllDataMethod } from "./github-controllers.js";
import { createScoreMethod } from "./score-controllers.js";
import { createUserDerailsMethod } from "./user-controller.js";

const createScoreAndRoastMsg = async (req, res) => {
    try {
        if (!req.body.username || !req.body.leetcodeUsername) {
            return res.status(400).json({ message: "Please provide both github and leetcode username" });
        }
        const { username, leetcodeUsername } = req.body;
        const isUserExists = await Stats.findOne({ username: username })
        const comebacks = [
            "Relax {username}, the last roast is still healing 💊🔥.",
            "Oh... back again? What happened? GitHub still showing 'Last Contribution: 3 months ago'?",
            "{username}, this ain't ChatGPT where you regenerate the same solution 5 times and still get TLE 💀🔥.",
            "One roast wasn't enough to refactor that spaghetti code?",
            "Retrying won't make your 2 commits look like 2000... go touch some code 🔥💀."
        ];
        const randomComeback = comebacks[Math.floor(Math.random() * comebacks.length)].replace("{username}", username);
        if (isUserExists) {
            return res.status(200).send({
                message: randomComeback
            })
        }
        // Step 1 - Get the all user details
        await getGithubLeetcodeUserAllDataMethod(username, leetcodeUsername);
        // Step 2 - Calculate the user score
        await createScoreMethod(username);
        //Step 3 - Generate the roast msg ,nicknames,emoji using GEMINI AI
        const roastMsg = await generateRoastMessageMethod(username);
        // Step 4 - Create user details for profie card
        const userDetails = await createUserDerailsMethod(username);
        return res.status(200).json({ message: "Successfully created score and roast message,emoji,Rank and nicknames", roastMsg });
    } catch (error) {
        console.log(error, "Error in main controller ++++++++++++++++++++++++++++++ \n");
        return res.status(500).json({ message: error.message })
    }
}

const leaderboardLists = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const searchQuery = req.query.search || '';
      
      // Build search filter
      let filter = {};
      if (searchQuery) {
        filter = {
          $or: [
            { username: { $regex: searchQuery, $options: 'i' } },
            { nickname: { $regex: searchQuery, $options: 'i' } },
            { location: { $regex: searchQuery, $options: 'i' } }
          ]
        };
      }
      
      // Get filtered data
      const leaderboardData = await Rank.find(filter)
        .sort({ rank: 1 })
        .skip((page - 1) * limit)
        .limit(limit);
    const totalFilteredUsers = await Rank.countDocuments(filter);
    // Count total users (regardless of filter)
    const totalUsers = await Rank.countDocuments();
      
      
      return res.status(200).json({
        totalUsers: totalUsers,
        totalFilteredUsers: totalFilteredUsers,
        totalPages: Math.ceil(totalFilteredUsers / limit),
        currentPage: page,
        leaderboardData: leaderboardData
  
      });
    } catch (error) {
      console.log(`Error while getting leaderboard list ${error}`);
      return res.status(500).json({
        message: error.message
      });
    }
  };
export { createScoreAndRoastMsg,leaderboardLists };