import User from "../models/user-model.js"
import { getGithubUserInformation } from "./github-controllers.js";

const createUserDerails = async (req, res) => {
    try {
        const {username} = req.body;
        const isUserExist = await User.findOne({username:username})
        if(isUserExist){
            return res.status(400).json({message:"User already exists"})
        }
        const userData = await getGithubUserInformation(username);
        const userDetails = {
            name:userData.name,
            avatar_url:userData.avatar_url,
            username:userData.login,
            bio:userData.bio,
            location:userData.location,
            followers:userData.followers,
            following:userData.following,
            twitter_username:userData.twitter_username,
            location:userData.location,
            
        }
        const user = await User.create(userDetails);
        return res.status(200).json({message:"User details created successfully", user})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Error in creating user details"})
    }
}


export {createUserDerails}
