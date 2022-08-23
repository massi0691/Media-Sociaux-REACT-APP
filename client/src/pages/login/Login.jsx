import { useContext ,useRef } from 'react';
import './login.css'
import { loginCall } from '../../apiCalls';
import {AuthContext} from '../../context/AuthContext';
import { CircularProgress } from "@mui/material";

export default function Login() {
    const email =useRef();
    const password =useRef();
    const {user,isFetching,error,dispatch}= useContext(AuthContext);
    const handleClick= (e)=>{
    e.preventDefault();
    loginCall({email:email.current.value,password:password.current.value},dispatch)
}
console.log(user);
  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Azetta n Tmetti</h3>
                <span className="loginDesc">Connecter avec vos proches et amis  avec Azetta n tmetti.</span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input type={"email"} placeholder='Email' className="loginInput" ref={email} required />
                    <input minLength={"6"} type={"password"} placeholder='Mot de passe' className="loginInput" ref={password} required/> 
                    <button className="loginButton" type="submit" disabled ={isFetching} >{isFetching ? <CircularProgress className='CircularProgress'/> : "Se Connecter"}</button>
                    <span className='loginForgot'>Mot de passe oublier?</span> 
                    <button className="loginRegisterButton">{isFetching ? <CircularProgress className='CircularProgress'/> : "Créer votre nouveau compte"}</button>  
                </form>
            </div>
        </div>
    </div>
  )
}
