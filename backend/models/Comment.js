import mongoose from "mongoose";

const { Schema } = mongoose;

const CommentSchema = mongoose.Schema({
  yourName: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  comment: {
    type: String,
    required: true,
  },
  reply: {
    type: [String],
  },
  user: {
    type: [String],
    required: true,
  }
},
{
  timestamps: true,
});

export default mongoose.model("Comment", CommentSchema);
