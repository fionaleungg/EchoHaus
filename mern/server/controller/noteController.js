import db from '../db/connection.js';
import { ObjectId } from 'mongodb';

const noteCollection = db.collection('note');
const recallCollection = db.collection('recall');

export const post = async (req) => {
  const {id} = req.user;
  const {name, text} = req.body;
  const now = new Date();
  const newNote = await noteCollection.insertOne({
    name,
    text,
    user_id: new ObjectId(id),
    time_uploaded: now
  });
  await recallCollection.insertOne({
    num_studied: 0,
    note_id: new ObjectId(newNote.insertedId),
    allarray: [{accuracy: [], time_recalled: [], user_answer: []}]
  })
  return {id: newNote.insertedId};
}

export const get = async (req) => {
  const {id} = req.user;

  const notes = await noteCollection.find({user_id: new ObjectId(id)}).toArray();
  let notearr = []
  for (const note of notes) {
    const obj = {
      id: note._id,
      name: note.name
    }
    notearr.push(obj);
  }
  return notearr;
}

export const getOne = async (req, noteid) => {
  const single_note = await noteCollection.findOne({_id: new ObjectId(noteid)});
  const obj = {
    name: single_note.name,
    time_uploaded: single_note.time_uploaded,
    text: single_note.text
  }
  return obj;
}