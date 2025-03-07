import mongoose from "mongoose";

const rankSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    rank: {
        type: Number,
        required: true,
    },
});

const Rank = mongoose.model("Rank", rankSchema);

export default Rank;


