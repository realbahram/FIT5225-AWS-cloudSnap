import React from "react";
import AccountContext from "../Context/AccountContext.js";
import userPool from "./userPool.js";
import {AuthenticationDetails, CognitoUser} from "amazon-cognito-identity-js";
const  AccountState = (props) =>{
    // logout
    const logout = async ()=>{
        return await new Promise((resolve,reject)=>{
            const user = userPool.getCurrentUser();
            if (user){
                user.signOut();
                resolve(user);
            }else{
                reject();
            }
        })

    }

    /// user session function
    const getSession = async ()=>{
        return await new Promise((resolve,reject)=>{
            const user = userPool.getCurrentUser();
            if (user){
                user.getSession(async (err,session)=>{
                    if (err){
                        reject(err);
                    }else{
                        //resolve(session);
                        const attributes = await new Promise((resolve,reject)=>{
                            user.getUserAttributes((err,attributes)=>{
                                if(err){
                                    console.log(err.message);
                                    reject(err);
                                }else{
                                    const result ={};
                                    for (let attribute of attributes){
                                        const {Name,Value} = attribute;
                                        result[Name] = Value;
                                    }
                                    resolve(result);
                                    console.log("result",result)
                                    localStorage.setItem('name',result.name);
                                    localStorage.setItem('family_name',result.family_name);
                                    localStorage.setItem('sub',result.sub);
                                };
                            })
                        })
                        resolve({user,...session,...attributes})

;                   }
                })
            }else {
                reject();
            }

        })
    }
    const signup = async (email,name,familiyname,password) =>{
        return await new Promise((resolve,reject)=>{
            var attributes = [];
            var userName = {
                Name: 'name',
                Value: name
            }
            var userFamilyName ={
                Name: 'family_name',
                Value: familiyname
            }
            attributes.push(userName);
            attributes.push(userFamilyName);

            userPool.signUp(email,password,attributes,null,(err,data)=>{
                if(err){
                    console.log("failed to register",err.message);
                    reject();
                }else{
                    console.log("account created",data);
                    resolve();

                }
            })
        })


    }
    // user login
    const authenticate = async (Username,Password) =>{
        return await new Promise((resolve,reject)=>{
            const user = new CognitoUser({
                Username,
                Pool: userPool
            })
            const  authDetails = new AuthenticationDetails({
                Username,
                Password
            })
            user.authenticateUser(authDetails,{
                onSuccess: (data)=>{
                    console.log("login success",data);
                    resolve(data);
                },
                onFailure:(err) =>{
                    console.log("failure".err.message);
                    reject(err);
                },
                newPasswordRequired:(data)=>{
                    console.log("new password required",data);
                    resolve(data);
                }

            })
        })
    }

    return(
        <AccountContext.Provider value={{signup,authenticate,getSession,logout}}>
            {props.children}
        </AccountContext.Provider>
    )
}
export default AccountState;