import mongoose from "mongoose";

const statsSchema = new mongoose.Schema({
    username:{
        type: String,
    },
    followers: {
        type: Number,
        
    },
    following:{
        type: Number,
    },
    contributions:{
        type: Number,
    },
    commits:{
        type: Number,
    },
    pullRequests:{
        type: Number,
    },
    leetcode:{
        type: Object,
    },
    favoriteLanguage:{
        type: String,
    }
})

const Stats = mongoose.model("Stats", statsSchema);

export default Stats;
