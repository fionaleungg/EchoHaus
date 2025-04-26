import db from '../db/connection.js';
import { ObjectId } from 'mongodb';

const noteCollection = db.collection('note');

export const post = async (req) => {
  const {id} = req.user;
  const {name, text} = req.body;
  const now = new Date();
  const newNote = await noteCollection.insertOne({
    name,
    text,
    user_id: id,
    time_uploaded: now
  });
  return {id: newNote.insertedId};
}

export const get = async (req) => {
  const {id} = req.user;

  const notes = await noteCollection.find({user_id: id}).toArray();
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
  const single_note = await noteCollection.findOne({_id: noteid});
  const obj = {
    name: single_note.name,
    time_uploaded: single_note.time_uploaded,
    text: single_note.text
  }
  return obj;
}