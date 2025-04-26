import React from 'react';
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
import RecallContext from './recall/RecallContext'
import RecallInput from './recall/RecallInput';
import ForgettingCurveChart from './graph/GraphImage';

function App() {
  const [currentRecall, setCurrentRecall] = React.useState("");

  return (
    <BrowserRouter>
      <RecallContext.Provider value={{currentRecall, setCurrentRecall}}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/graph" element={
            <ForgettingCurveChart />
          } />
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
      </RecallContext.Provider>
    </BrowserRouter>
  )
}

export default App
