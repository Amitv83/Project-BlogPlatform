import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage(){

  const [username,setusername]=useState('');
   const [password,setpassword]=useState('');
   const[redirect,setredirect]=useState(false);
   const{setuserinfo}=useContext(UserContext)

  async function login(e){
    e.preventDefault();
 const response=  await  fetch('http://localhost:4000/login',{
      method:'Post',
     body: JSON.stringify({ username, password }),

      headers:{'Content-Type':'application/json'},

      credentials:'include',
    });

    if(response.ok){

      response.json().then((userinfo)=>{
        setuserinfo(userinfo);

          setredirect(true);
      })

        
    }else{
      alert('wrong credintials')
    }

   }
   if(redirect){
    return <Navigate to={'/'}/>
   }

    return(
      <>
         <form  className="login" onSubmit={login}>
             <h1>Login</h1>
            <input
            value={username}
            onChange={(e)=>setusername(e.target.value)}
            
            type = "text" placeholder="username"/>
            <input
            value={password}
             onChange={(e)=>setpassword(e.target.value)}
            
            type= "password" placeholder="password"/>
            <button> login</button>
         </form>
      </>

    );

}