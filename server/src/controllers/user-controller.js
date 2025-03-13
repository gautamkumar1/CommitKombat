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


export {createUserDerailsMethod}
