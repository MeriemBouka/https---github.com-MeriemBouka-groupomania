import React,{useContext} from 'react'
import { BrowserRouter as Router,Routes,Route, Navigate} from 'react-router-dom'
import Enregistrement from"./pages/Enregistrement.jsx"
import Login from "./pages/Login"
import Home from "./pages/Home"
import {AuthContext} from "./components/context/AuthContext"

function App() {
  const {user} = useContext(AuthContext)
  return(
    <React.StrictMode>
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Login />}>
        </Route>
        <Route path="/login" element={user ? <Navigate to ="/" /> : <Login />}>
        </Route>
        <Route path="/signup" element={user ? <Navigate to ="/" /> : <Enregistrement />}>
        </Route>
      </Routes>
    </Router>
    </React.StrictMode>
  )
   
  }


export default App;
