import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import SignIn from "./pages/Signin";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Profile from "./pages/Profile";


function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/sign-in' element={<SignIn/>} />
          <Route path='/sign-up' element={<SignUp/>} />
          <Route path='/about' element={<About/>}    />
          <Route path='/profile' element={<Profile/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
