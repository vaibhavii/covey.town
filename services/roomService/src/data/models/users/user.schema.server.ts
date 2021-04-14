import mongoose from 'mongoose';
const { Schema } = mongoose;
/**
 * Each user has the following fields.
 */
export const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  bio: String,
  location: String,
  occupation: String,
  instagramLink: String,
  facebookLink: String,
  linkedInLink: String,
  requests:[String],
  sentRequests:[String],
  friends:[String]
}, {collection:'User'});

