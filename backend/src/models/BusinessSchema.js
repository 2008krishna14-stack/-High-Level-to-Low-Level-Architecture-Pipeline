import mongoose from "mongoose";

const BusinessSchema = new mongoose.Schema({
    requirement: String,
    architecture: Object,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Business = mongoose.model("Business", BusinessSchema);
export default Business;