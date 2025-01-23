import type { User } from '@/types/user';
import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface UserSchemaDocument extends User, Document {
  hashPassword: (password: string) => Promise<string>;
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema<UserSchemaDocument>(
  {
    nickName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const User = model('User', UserSchema);
export default User;
