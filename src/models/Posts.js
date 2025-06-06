import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  createdDate: { type: Date, default: Date.now },
});

export default mongoose.model("Posts", postSchema);
