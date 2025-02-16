import mongoose, { Schema, model, Document } from 'mongoose';

export interface ReviewDocument extends Document {
  isbn13: string;
  accountId: string;
  user_id: mongoose.Types.ObjectId;
  rating: number;
  content: string;
}

const ReviewSchema = new Schema<ReviewDocument>(
  {
    isbn13: { type: String, required: true },
    accountId: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true },
);

const Review = model('Review', ReviewSchema);
export default Review;
