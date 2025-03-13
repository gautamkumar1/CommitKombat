import Score from "../models/score-model.js";
import Rank from "../models/rank-model.js";
import { getGithubUserInformation } from "./github-controllers.js";

const rankInitialize = async (username) => {
    try {
        // Fetch user details from GitHub
        const userData = await getGithubUserInformation(username);

        // Extract necessary user details
        const userDetails = {
            avatar_url: userData.avatar_url || "",
            username: userData.login,
            location: userData.location || "",
        };

        // Fetch all scores and sort by highest score
        const allScores = await Score.find().sort({ score: -1 });

        // Fetch existing users from Rank collection
        const existingUsers = await Rank.find({}, { username: 1, location: 1 });
        const existingUserMap = new Map(existingUsers.map(user => [user.username, user.location]));

        // Update ranks for all users
        const rankUpdates = allScores.map((s, index) => {
            const existingLocation = existingUserMap.get(s.username) || "";
            return {
                updateOne: {
                    filter: { username: s.username },
                    update: {
                        username: s.username,
                        rank: index + 1,
                        score: s.score,
                        avatar_url: s.username === username ? userDetails.avatar_url : "",
                        location: existingUserMap.has(s.username) ? existingLocation : userDetails.location,
                    },
                    upsert: true,
                },
            };
        });

        await Rank.bulkWrite(rankUpdates);
        console.log("Rank updated successfully");
        return true;
    } catch (error) {
        console.log(error, "Error in rank initialization");
        return false;
    }
};

const userInTop10Rank = async (username) =>{
    try {
     const top10Rank = await Rank.find().sort({rank:1}).limit(10);
     const userRank = top10Rank.find((rank) => rank.username === username);
     return userRank ? true : false;
    } catch (error) {
     console.log(error,"Error in user in top 10 rank");
     return false;
    }
 }
 const userInTop3Rank = async (username) =>{
    try {
     const top3Rank = await Rank.find().sort({score:1}).limit(3);
     const userRank = top3Rank.find((rank) => rank.username === username);
     return userRank ? true : false;
    } catch (error) {
     console.log(error,"Error in user in top 3 rank");
     return false;
    }
 }
 const userInTop1Rank = async (username) =>{
    try {
     const top1Rank = await Rank.find().sort({score:1}).limit(1);
     const userRank = top1Rank.find((rank) => rank.username === username);
     return userRank ? true : false;
    } catch (error) {
     console.log(error,"Error in user in top 1 rank");
     return false;
    }
 }

const testingRank = async (req,res) =>{
    try {
        const initializedRank = await rankInitialize();
        if(!initializedRank){
            return res.status(500).json({message:"Error in rank initialization"});
        }
        const {username} = req.body;
        const isUser1Rank = await userInTop1Rank(username);
        if (isUser1Rank) {
            console.log("User is in top 1 rank");
            return res.status(200).json({message:"User is in top 1 rank",flag:true});
        }
        const isUser3Rank = await userInTop3Rank(username);
        if (isUser3Rank) {
            console.log("User is in top 3 rank");
            return res.status(200).json({message:"User is in top 3 rank",flag:true});
        }
        const isUser10Rank = await userInTop10Rank(username);
        if (isUser10Rank) {
            console.log("User is in top 10 rank");
            return res.status(200).json({message:"User is in top 10 rank",flag:true});
        }
        
        
        const userRankIsBelowRoastThemBrutally = isUser10Rank && isUser3Rank && isUser1Rank;
        console.log("User is not in top 10, 3 or 1 rank");
        return res.status(200).json({message:"User is not in top 10, 3 or 1 rank",flag:userRankIsBelowRoastThemBrutally});
    } catch (error) {
        console.log(error,"Error in testing rank");
        return res.status(500).json({message:"Error in testing rank"});
    }
}
export {rankInitialize,userInTop10Rank,userInTop3Rank,userInTop1Rank,testingRank}
