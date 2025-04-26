
import './App.css'
import GeminiGenerator from './GeminiGenerator'
import Landing from './signup-login/Landing'
import Signup from './signup-login/Signup'
import Login from './signup-login/Login'
import NoteList from './notes/NoteList'
import UploadNotes from './notes/UploadNotes'
import NavBar from './navigation/NavBar'

function App() {


  return (
    <>
      <NavBar/>
      {/* <GeminiGenerator /> */}
      {/* <Landing /> */}
      {/* <Signup /> */}
      {/* <Login /> */}
      {/* <NoteList /> */}
      <UploadNotes/>
      {/* <p className="read-the-docs">
      </p> */}
    </>
  )
}

export default App
