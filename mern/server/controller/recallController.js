import db from '../db/connection.js';
import { ObjectId } from 'mongodb';

const recallCollection = db.collection('recall');

export const post = async (req, note_id) => {
  const {accuracy, user_answer} = req.body;
  const now = new Date();
  const newRecall = await recallCollection.insertOne({
    accuracy,
    user_answer,
    note_id: new ObjectId(note_id),
    time_recalled: now
  });
  return {id: newRecall.insertedId};
}

export const get = async (req, note_id) => {

  const recalls = await recallCollection.find({note_id: new ObjectId(note_id)}).toArray();
  let recallarr = []
  for (const recall of recalls) {
    const obj = {
      accuracy: recall.accuracy,
      time_recalled: recall.time_recalled,
      user_answer: recall.user_answer
    }
    recallarr.push(obj);
  }
  return recallarr;
}
