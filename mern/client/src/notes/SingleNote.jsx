import React from 'react'

function SingleNote() {
  const [singleNote, setSingleNote] = React.useState(undefined);
  React.useEffect(() => {
    fetchSingleNote();
  }, []);
  const fetchSingleNote = async (event) => {
    const token = localStorage.getItem('token');
    const note_id = '680c539096836eead4200b97';
    await fetch(`http://localhost:5050/api/v0/note/${note_id}`, {
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
        setSingleNote(json);
      })
      .catch((error) => {
        throw(error);
      })
  }
  return (
    <>
    {singleNote != undefined ? 
      <div>
        <div>Name: {singleNote.name}</div>
        <div>Content: {singleNote.text}</div>
      </div>
      :
      <div>You don't have any notes</div>
    }
    </>
  )
}

export default SingleNote;