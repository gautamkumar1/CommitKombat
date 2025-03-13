import User from "../models/user-model.js"
import Rank from "../models/rank-model.js"
import Roast from "../models/ai-model.js"
import { getGithubUserInformation } from "./github-controllers.js";

const createUserDerailsMethod = async (username) => {
    try {
        const isUserExist = await User.findOne({username:username})
        if(isUserExist){
            return res.status(400).json({message:"User already exists"})
        }
        const userData = await getGithubUserInformation(username);
        const rankData = await Rank.findOne({username:username})
        const roastData = await Roast.findOne({username:username});
        const userDetails = {
            githubLink:userData.html_url,
            name:userData.name,
            avatar_url:userData.avatar_url,
            username:userData.login,
            bio:userData.bio,
            location:userData.location,
            followers:userData.followers,
            following:userData.following,
            twitter_username:userData.twitter_username,
            location:userData.location,
            rank:rankData.rank,
            score:rankData.score,
            aiNickname:rankData.nickname,
            aiGeneratedRoast:roastData.roastMessage,
            aiEmoji:roastData.emoji
        }
        const user = await User.create(userDetails);
        return ({message:"User details created successfully", user})
    } catch (error) {
        console.log(error);
        return ({message:"Error in creating user details"})
    }
}
const createUserDerails = async (req, res) => {
    try {
        const {username} = req.body;
        // const isUserExist = await User.findOne({username:username})
        // if(isUserExist){
        //     return res.status(400).json({message:"User already exists"})
        // }
        const userData = await getGithubUserInformation(username);
        const rankData = await Rank.findOne({username:username})
        const roastData = await Roast.findOne({username:username});
        const userDetails = {
            githubLink:userData.html_url,
            name:userData.name,
            avatar_url:userData.avatar_url,
            username:userData.login,
            bio:userData.bio,
            location:userData.location,
            followers:userData.followers,
            following:userData.following,
            twitter_username:userData.twitter_username,
            location:userData.location,
            rank:rankData.rank,
            score:rankData.score,
            aiNickname:rankData.nickname,
            aiGeneratedRoast:roastData.roastMessage,
            aiEmoji:roastData.emoji
        }
        const user = await User.create(userDetails);
        return res.status(200).json({message:"User details created successfully", user})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error in creating user details"})
    }
}
const getUserDetailsByUsername = async (req, res) => {
    try {
        const {username} = req.body;
        const userData = await User.findOne({username:username});
        if(!userData){
            return res.status(400).json({message:"User not found"});
        }
        return res.status(200).json({message:"User details found successfully", userData});
    } catch (error) {
        console.log(error,"Error in getting user details");
        return res.status(500).json({message:"Error in getting user details"});
        
    }
}
export {createUserDerailsMethod,getUserDetailsByUsername,createUserDerails}
