import React from 'react'

function NoteList() {
  const [notearray, setNoteArray] = React.useState([]);
  React.useEffect(() => {
    fetchNotes();
  }, []);
  const fetchNotes = async (event) => {
    const token = localStorage.getItem('token');
    await fetch('http://localhost:5050/api/v0/note', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((json) => {
        setNoteArray(json);
      })
      .catch((error) => {
        throw(error);
      })
  }

  return (
    <>
      {notearray.map((note, index) => (
        <div>{note.name} {note.id}</div>
      ))}
    </>
  )
  
}

export default NoteList;