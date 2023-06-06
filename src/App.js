
import React from "react";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Login from "./components/Login.js";
import Home from "./components/Home.js";
import {BrowserRouter,Route,Routes} from "react-router-dom";
import AccountState from "./States/AccountState.js";
import AdminDashboard from "./components/AdminDashboard.js";
import UploadImage from "./components/UploadImage.js"
function App() {
  return (
      <BrowserRouter>
          <AccountState>
              <Header/>
              <div className="App">
                  <Routes>
                      <Route exact path="/" element={<Login/>}></Route>
                      <Route exact path="/home" element={<Home/>}></Route>
                      <Route exact path="/admin" element={<UploadImage/>}></Route>
                  </Routes>
              </div>
              <Footer/>
          </AccountState>
      </BrowserRouter>


  );
}

export default App;
