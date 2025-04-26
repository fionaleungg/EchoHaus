
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import GeminiGenerator from './GeminiGenerator'
import Landing from './signup-login/Landing'
import Signup from './signup-login/Signup'
import Login from './signup-login/Login'
import NoteList from './notes/NoteList'
import UploadNotes from './notes/UploadNotes'
import SingleNote from './notes/SingleNote'
import NavBar from './navigation/NavBar'

function App() {


  return (
    // <>
    //   {/* <GeminiGenerator /> */}
    //   <Landing />
    //   {/* <Signup /> */}
    //   {/* <Login /> */}
    //   {/* <p className="read-the-docs">
    //   </p> */}
    // </>
    // <UserContext.Provider value={{currentUserEmail, setUserEmail, currentUserName, setUserName}}>
    //   <HouseContext.Provider value={{houseName, setHouseName, houseType, setHouseType}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={
            // <AuthenticatedRoute>
              <Login />
            // </AuthenticatedRoute>
          } />
          <Route path="/signup" element={
            // <AuthenticatedRoute>
              <Signup />
            // </AuthenticatedRoute>
          } />
        </Routes>
      </BrowserRouter>
    //   </HouseContext.Provider>
    // </UserContext.Provider>
  )
}

export default App
