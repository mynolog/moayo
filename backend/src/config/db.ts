import mongoose from 'mongoose';

const connectDB = async (mongoURI: string) => {
  try {
    await mongoose.connect(mongoURI, {
      dbName: 'books',
    });
    console.log('→ MongoDB Atlas connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas: ', error);
    process.exit(1);
  }
};

export default connectDB;
