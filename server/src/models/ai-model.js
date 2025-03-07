import mongoose from "mongoose";

const roastSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    roastMessage: {
        type: String,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
    },
    emoji: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Roast = mongoose.model("Roast", roastSchema);

export default Roast;

