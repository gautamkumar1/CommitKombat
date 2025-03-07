import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    avatar_url:{
        type: String,
    },
    name: {
        type: String,
        
    },
    username: {
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

