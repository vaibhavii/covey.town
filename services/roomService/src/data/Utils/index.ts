import mongoose from 'mongoose';

const uri =
  'mongodb+srv://user:user@cluster0.y7ubd.mongodb.net/CoveyTown?retryWrites=true&w=majority';
export const connection = async () => {
  try {
    const conn= mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database connected successfully');
    return conn;
  }
  catch (error) {
    throw error;
  };
}