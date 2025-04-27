import db from '../db/connection.js';
import bcrypt from 'bcryptjs';

const collection = db.collection('user');

export const signup = async (req) => {
  const { email, password, name } = req.body;

  const existing = await collection.findOne({ email: email });
  if (existing) {
    throw new Error('Email already registered');
  }

  const salt = await bcrypt.genSalt(12);
  const pwhash = await bcrypt.hash(password, salt);

  await collection.insertOne({ email, name, pwhash });
};

export const get = async (req) => {
  const { email } = req.query;

  const existing = await collection.findOne(
    { email: email },
    { projection: { _id: 0, pwhash: 0 } }
  );
  if (!existing) {
    throw new Error('User not found');
  }

  return existing;
};