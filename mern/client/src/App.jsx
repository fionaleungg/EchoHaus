
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
import Timer from './Timer';

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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mynotes" element={
            <>
              <NavBar />
              <NoteList />
            </>
          } />
          <Route path="/uploadnotes" element={
            <>
              <NavBar />
              <UploadNotes />
            </>
          } />
          <Route path="/study" element={
            <>
              <NavBar />
              <SingleNote />
            </>
            } />
          <Route path="/intermission" element={<Timer />} />
        </Routes>
      </BrowserRouter>
    //   </HouseContext.Provider>
    // </UserContext.Provider>
  )
}

export default App
