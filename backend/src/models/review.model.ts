import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    isbn: { type: String, required: true },
    userId: { type: String, required: true },
    reviewText: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
  },
  { timestamps: true }
);

const Review = model("Review", reviewSchema);
export default Review;
