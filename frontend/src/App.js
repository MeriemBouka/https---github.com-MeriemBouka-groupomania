import React from 'react'
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Enregistrement from"./pages/Enregistrement.jsx"
import Login from "./pages/Login"
import Home from "./pages/Home"

function App() {
  return(
    <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        <Route path="/signup" element={<Enregistrement />}>
        </Route>
        <Route path="/login" element={<Login />}>
        </Route>
      </Routes>
    </Router>
    </React.StrictMode>
  )
   
  }


export default App;
