import React, {useContext, useState,useEffect} from "react";
import {Link} from "react-router-dom";
import AccountContext from "../Context/AccountContext.js";
import userPool from "../States/userPool.js";
function Header(){
    const context = useContext(AccountContext);

    const {getSession,logout} = context;
    const [activeUser,setActiveUser] = useState(false);
    const logOut =()=>{
        logout()
            .then(data=>{
                console.log("logged out")
            })
            .catch(err=>{
                console.log(err);
            })
    }
    useEffect(()=>{
        getSession()
            .then(session =>{
                setActiveUser(true);
            })
            .catch(err=>{
                setActiveUser(false);
            })
    })
    return(
        <div>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <Link id="brand_name" className="navbar-brand" to="/">fit5046</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {activeUser &&
                                <li className="nav-item">
                                <Link id="hover" className="nav-link active" aria-current="page" to="/">Home</Link>
                                </li>
                            }
                            {!activeUser &&
                                <li className="nav-item">
                                <Link id="hover" className="nav-link active" aria-current="page" to="/login">Login</Link>
                                </li>
                            }
                            {activeUser &&
                                <li className="nav-item">
                                <Link id="hover" className="nav-link active" aria-current="page" to="/admin">dashboard</Link>
                                </li>
                            }
                        </ul>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                            </button>
                            <ul className="dropdown-menu dropdown-menu-dark">
                                <li><button className="dropdown-item" type="button">User Info</button> </li>
                                <li><button className="dropdown-item" type="button">change password</button> </li>
                                <li><button className="dropdown-item" type="button" onClick={logOut}>log out</button> </li>
                                <li><button className="dropdown-item" type="button">delete account</button> </li>
                            </ul>
                        </div>
                        <span className="navbar-text">logged in as , <span className="name-color">username</span></span>
                    </div>
                </div>
            </nav>
        </div>

    )
}export default Header;