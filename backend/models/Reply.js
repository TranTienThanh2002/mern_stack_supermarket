import mongoose from "mongoose";

const { Schema } = mongoose;

const ReplySchema = mongoose.Schema({
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
    type: String,
    required: true,
  }
},
{
  timestamps: true,
});

export default mongoose.model("Reply", ReplySchema);
