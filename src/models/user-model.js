import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        
    },
    username: {
        type: String,
        
    },
    leetcodeUsername: {
        type: String,
        
    },
    bio:{
        type: String,
        
    },
    location:{
        type: String,
    },
    followers:{
        type: Number,
    },
    following:{
        type: Number,
    },
    twitter_username:{
        type: String,
    },
    rank:{
        type: Number,
    },
    score:{
        type: Number,
    }

});

const User = mongoose.model("User", userSchema);

export default User;

