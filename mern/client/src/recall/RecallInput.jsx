import React from 'react'
import RecallContext from './RecallContext'

function RecallInput() {
  const rtx = React.useContext(RecallContext);
  const [curInput, setCurInput] = React.useState("");
  return (
    <>
      <input type="text" onChange={(e) => setCurInput(e.target.value)} />
      <button onClick={() => rtx.setCurrentRecall(curInput)}>Submit Recall</button>
    </>
  )
}

export default RecallInput;