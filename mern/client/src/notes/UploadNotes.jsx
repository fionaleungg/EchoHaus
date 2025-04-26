import React from 'react'

function UploadNotes() {
  const [name, setName] = React.useState("");
  const [text, setText] = React.useState("");
  const uploadNotes = async (event) => {
    const token = localStorage.getItem('token');
    const content = {
      name: name,
      text: text
    };
    await fetch('http://localhost:5050/api/v0/note', {
      method: 'POST',
      body: JSON.stringify(content),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        setName("");
        setText("");
      })
      .catch((error) => {
        throw(error);
      })
  }
  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name your notes"
      />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your notes here"
      />
      <button onClick={uploadNotes}/>
    </>
  )
}

export default UploadNotes;