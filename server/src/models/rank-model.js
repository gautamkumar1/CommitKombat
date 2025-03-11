import mongoose from "mongoose";

const rankSchema = new mongoose.Schema({
    avatar_url: {
        type: String,
        default:""
    },
    username: {
        type: String,
        required: true,
    },
    rank: {
        type: Number,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    nickname: {
        type: String,
    },
    location:{
        type: String,
    }

});

const Rank = mongoose.model("Rank", rankSchema);

export default Rank;


