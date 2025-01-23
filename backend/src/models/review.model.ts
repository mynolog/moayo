import { Schema, model, Document } from 'mongoose';

interface ReviewSchemaDocument extends Document {
  isbn: string;
  userId: string;
  rating: number;
  content?: string;
}

const ReviewSchema = new Schema<ReviewSchemaDocument>(
  {
    isbn: { type: String, required: true },
    userId: { type: String, required: true },
    rating: { type: Number, min: 1, max: 10, required: true },
    content: { type: String, required: false },
  },
  { timestamps: true },
);

const Review = model('Review', ReviewSchema);
export default Review;
