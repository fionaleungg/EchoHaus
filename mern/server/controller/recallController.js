import db from '../db/connection.js';
import { ObjectId } from 'mongodb';

const recallCollection = db.collection('recall');

export const put = async (req, note_id) => {
  const {accuracy, user_answer} = req.body;
  const now = new Date();

  const recalls = await recallCollection.findOne({note_id: new ObjectId(note_id)});
  const num = recalls.num_studied;
  const allarray = recalls.allarray; // array of objects
  const findindex = allarray[num];
  if (!findindex) {
    const newobj = {
      accuracy: [accuracy],
      time_recalled: [now],
      user_answer: [user_answer]
    };
    allarray.push(newobj);
  } else {
    findindex.accuracy.push(accuracy);
    findindex.time_recalled.push(now);
    findindex.user_answer.push(user_answer);
  }
  await recallCollection.updateOne(
    {_id: recalls._id},
    {$set: {allarray: allarray}}
  );
}

export const putNum = async (req, note_id) => {
  const recalls = await recallCollection.findOne({note_id: new ObjectId(note_id)});
  const num = recalls.num_studied;
  await recallCollection.updateOne(
    {_id: recalls._id},
    {$set: {num_studied: num + 1}}
  );
}

export const get = async (req, note_id) => {

  const recalls = await recallCollection.findOne({note_id: new ObjectId(note_id)});
  return recalls;
}
