import React, {useState,useContext,useEffect} from "react";
import accountContext from "../Context/AccountContext.js";
import AccountContext from "../Context/AccountContext.js";
function Login(){
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [familyName,setFamilyName]= useState("");
    const [password,setPassword] = useState("");
    const [registered,setRegistered] = useState(true);

    const {signup, authenticate,getSession} = useContext(AccountContext);

    useEffect(()=>{
        getSession()
            .then(session=>{
                console.log(session);
            })
            .catch(err=>{
                console.log(err);
            })
    },[])
    const handleClick = () =>{
        setRegistered(true);
    }
    const secondClick = () =>{
        setRegistered(false);
    }

    // user register

    const handleRegister = (event) =>{
        event.preventDefault();
        signup(email,name,familyName,password)
            .then(data =>{
                console.log("register done", data);

            })
            .catch(err =>{
                console.log("failed to register". err.message);
            })
    }
    //login func
    const handleLogin =(event)=>{
        event.preventDefault();
        authenticate(email,password)
            .then(data =>{
                localStorage.setItem('email',email);
                console.log("login successfull",data);
            })
            .catch(err=>{
                console.log("fail to login",err.message);
            })
    }
    return(
        <div className="col-md-4 text-center my-3 margin">
            <h2>{registered ? "login here": "sign here"}</h2>
            <form className="my-3" id="login-form">
                <div className="input-group col-md-4 my-4">
                    {!registered &&
                        <div className="input-group flex-nowrap">
                        <input value={name} onChange={(event)=> setName(event.target.value)} type="text" className="form-control" placeholder="Name" aria-label="Name"
                               aria-describedby="addon-wrapping"/>
                        </div>
                    }
                    {!registered &&
                        <div className="input-group flex-nowrap">
                            <input value={familyName} onChange={(event)=> setFamilyName(event.target.value)}type="text" className="form-control" placeholder="Family Name" aria-label="FamilyName"
                                   aria-describedby="addon-wrapping"/>
                        </div>
                    }
                    <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">@</span>
                        <input value={email} onChange={(event)=> setEmail(event.target.value)}type="text" className="form-control" placeholder="Email" aria-label="Email"
                               aria-describedby="addon-wrapping"/>
                    </div>
                    <div className="input-group col-md-4 my-4">
                        <div className="input-group flex-nowrap">
                            <input value={password} onChange={(event)=> setPassword(event.target.value)}type="password" className="form-control" placeholder="Password" aria-label="Password"
                                   aria-describedby="addon-wrapping"/>
                            <span className="input-group-text" id="addon-wrapping">@</span>
                        </div>
                        <h6 className="my-2 mx-2 login-signup">Forgot Password</h6>
                    </div>
                </div>
                {!registered && <h6 className="my-2 mx-2 login-signup" onClick={handleClick}>Already a user, Login</h6>}
                {registered && <h6 className="my-2 mx-2 login-signup" onClick={secondClick}>New user, Signup</h6>}
                <div className='col-12'>
                    <button type="button" className="btn btn-secondary my-3 mx-3">Cancel</button>
                    <button type="button" className="btn btn-primary my-3" onClick={!registered ? handleRegister : handleLogin}>{registered ? "Login" : "sign Up"}</button>
                </div>
            </form>
        </div>
    )
}export default Login;