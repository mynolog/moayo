import { Schema, model, Document } from 'mongoose';

export interface ReviewDocument extends Document {
  isbn13: string;
  userId: string;
  title: string;
  rating: number;
  content?: string;
}

const ReviewSchema = new Schema<ReviewDocument>(
  {
    isbn13: { type: String, required: true },
    userId: { type: String, required: true },
    title: { type: String, required: true },
    rating: { type: Number, min: 1, max: 10, required: true },
    content: { type: String, required: false },
  },
  { timestamps: true },
);

const Review = model('Review', ReviewSchema);
export default Review;
