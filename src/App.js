
import React from "react";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Login from "./components/Login.js";
import Home from "./components/Home.js";
import {BrowserRouter,Route,Routes} from "react-router-dom";
import AccountState from "./States/AccountState.js";
import AdminDashboard from "./components/AdminDashboard.js";
import UploadImage from "./components/UploadImage.js"
import SearchByTag from "./components/SearchByTag.js";
import AddRemove from "./components/Add&Remove.js";
import SearchByImage from "./components/SearchByImage.js";
import DeleteImage from "./components/DeleteImage.js";
function App() {
  return (
      <BrowserRouter>
          <AccountState>
              <Header/>
              <div className="App">
                  <Routes>
                      <Route exact path="/" element={<Login/>}></Route>
                      <Route exact path="/home" element={<Home/>}></Route>
                      <Route exact path="/uploadImage" element={<UploadImage/>}></Route>
                      <Route exact path="/searchByTags" element={<SearchByTag/>}></Route>
                      <Route exact path="/addremove" element={<AddRemove/>}></Route>
                      <Route exact path="/searchByImage" element={<SearchByImage/>}></Route>
                      <Route exact path="/deleteimage" element={<DeleteImage/>}></Route>
                  </Routes>
              </div>
              <Footer/>
          </AccountState>
      </BrowserRouter>


  );
}

export default App;
