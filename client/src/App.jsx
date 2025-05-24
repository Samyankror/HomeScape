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
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import Listing from "./pages/Listing"


function App() {
  const [count, setCount] = useState(0);


  return (
    <BrowserRouter>
    <Header />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/sign-in' element={<SignIn/>} />
          <Route path='/sign-up' element={<SignUp/>} />
          <Route path='/about' element={<About/>}    />
          <Route path='/listing/:listingId' element={<Listing />}/>
          <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile/>} />
          <Route path='/create-listing' element={<CreateListing/>} />
          <Route path='/update-listing/:listingId' element={<UpdateListing />}/>
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
