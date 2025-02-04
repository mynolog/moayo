import { Schema, model, Document, Types } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserDocument extends Document {
  accountId: string;
  password: string;
  _id: Types.ObjectId;
  email?: string;
  birthDate?: Date;
  gender?: 'male' | 'female' | 'other';
  hashPassword: (password: string) => Promise<string>;
  verifyPassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema<UserDocument>(
  {
    accountId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: false },
    birthDate: { type: Date, required: false },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: false,
    },
  },
  { timestamps: true },
);

UserSchema.methods.hashPassword = async function (password: string): Promise<string> {
  const SALT_ROUNDS = Number(process.env.SALT_ROUNDS || '10');
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
};

UserSchema.methods.verifyPassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const User = model('User', UserSchema);
export default User;
