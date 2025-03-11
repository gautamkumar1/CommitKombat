import Score from "../models/score-model.js";
import Stats from "../models/stats-model.js"
const calculateScore = (statusData) => {
    let score = 0;

    // Positive Points
    score += statusData.commits * 1; // 1 point per commit
    score += statusData.pullRequests * 10; // 10 points per PR
    score += statusData.followers * 5; // 5 points per follower
    score += statusData.contributions * 2; // 2 points per contribution

    const leetcode = statusData.leetcode || {}; // Default to empty object if undefined

    score += (leetcode.easySolved || 0) * 3; // 3 points per easy solved
    score += (leetcode.mediumSolved || 0) * 5; // 5 points per medium solved
    score += (leetcode.hardSolved || 0) * 10; // 10 points per hard solved
    score += (leetcode.reputation || 0) * 5; // 5 points per reputation

    // Rank Bonus
    if (leetcode.ranking !== undefined) {
        if (leetcode.ranking <= 100000) {
            score += 100;
        } else if (leetcode.ranking <= 200000) {
            score += 50;
        } else if (leetcode.ranking <= 500000) {
            score += 20;
        }
    }

    // Negative Points
    score -= statusData.following * 2; // -2 points per following
    if (leetcode.acceptanceRate !== undefined && leetcode.acceptanceRate < 60) {
        score -= 10; // Penalty for low acceptance rate
    }

    return score;
};

const createScore = async (req, res) => {
    try {
        const {username} = req.body;
        const statusData = await Stats.findOne({username:username});
        if(!statusData){
            return res.status(400).json({message:"User not found"})
        }
        const isScoreExists = await Score.findOne({username:username});
        if(isScoreExists){
            return res.status(200).json({message:"Score already exists"})
        }
        const score = calculateScore(statusData);
        const scoreData = {
            username:username,
            score:score
        }
        const newScore = await Score.create(scoreData);
        return res.status(200).json({message:"Score created successfully", score:newScore})
    } catch (error) {
        return res.status(500).json({message:"Error in creating score"})
    }
}
const createScoreMethod = async (username) => {
    try {
        const statusData = await Stats.findOne({username:username});
        if(!statusData){
            return res.status(400).json({message:"User not found"})
        }
        const isScoreExists = await Score.findOne({username:username});
        if(isScoreExists){
            return ({message:"Score already exists"})
        }
        const score = calculateScore(statusData);
        const scoreData = {
            username:username,
            score:score
        }
        const newScore = await Score.create(scoreData);
        return {message:"Score created successfully", calculateScore:score}
    } catch (error) {
        return false;
    }
}

const getTopUser = async (req,res) =>{
    try {
        const top10User = await Score.find().sort({score:-1}).limit(10);
        const top1User = await Score.find().sort({score:-1}).limit(1);
        const top3User = await Score.find().sort({score:-1}).limit(3);
        return res.status(200).json({message:"Top 10 users", top10User, top1User, top3User})
    } catch (error) {
        return res.status(500).json({message:"Error in getting top 10 users"})
    }
}

export {createScore, getTopUser,createScoreMethod}
