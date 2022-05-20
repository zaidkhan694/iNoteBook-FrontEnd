import "./App.css";
import  Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NoteState from "./Context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
function App() {
  const [alert, setAlert] = useState(null);
  const showAlert =(message , type) => 
  {
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <NoteState>
    <Router>
    <>
    <Navbar showAlert={showAlert} />
    <Alert alert={alert}/>
    <div className='container'>
    <Switch>
      <Route exact path="/home"><Home showAlert={showAlert} /></Route>
      <Route exact path="/about"><About/></Route>
      <Route exact path="/login"><Login showAlert={showAlert} /></Route>
      <Route exact path="/signup"><Signup showAlert={showAlert} /></Route>
    <Home/>
    <About/>
    </Switch>
    </div> 
    </>
    </Router>
    </NoteState>
  );
}

export default App;
