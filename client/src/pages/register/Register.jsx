import { useRef } from 'react';
import './register.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
export default function Register() {

    const email =useRef();
    const username =useRef();
    const password =useRef();
    const passwordAgain =useRef();
    const navigate = useNavigate()
    const handleClick= async (e)=>{
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            passwordAgain.current.setCustomValidity("Les mots de passes ne sont pas identiques!");
        }else{
            const user = {
                username:username.current.value,
                email:email.current.value,
                password:password.current.value,
            }
            try {
                await axios.post("/auth/inscription",user);
                navigate("/connexion");
                
            } catch (error) {
                console.log(error);
            }


        }
    }



  return (
    <div className='login'>
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">Azetta n Tmetti</h3>
                <span className="loginDesc">Connecter avec vos proches et amis  avec Azetta n tmetti.</span>
            </div>
            <form className="loginRight" onSubmit={handleClick}>
                <div className="loginBox">
                    <input placeholder="Nom d\'utilisateur" className="loginInput" ref={username} required/>
                    <input placeholder='Email' className="loginInput" type={"email"} ref={email}  required/>
                    <input placeholder='Mot de passe' className="loginInput" type={"password"} ref={password} required minLength={"6"}/> 
                    <input placeholder='Confirmer le Mot de passe' className="loginInput" type={"password"} ref={passwordAgain} required/> 
                    <button className="loginButton" type='submit'>S'inscrire</button>
                    <button className="loginRegisterButton">Connecter à votre compte</button>  
    
                </div>
            </form>
        </div>
    </div>
  )
}
