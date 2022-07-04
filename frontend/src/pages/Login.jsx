import React, {useRef, useContext} from "react"
import styled from "styled-components"
import Logo from "../assets/icon-left-font.svg"
import colors from "../utils/colors"
import {loginCall} from "../../src/apiCalls"
import {AuthContext} from "../components/context/AuthContext"

const LogIn = styled.div`
width: 100vw; 
height:100vh;
background-color: ${colors.blanc};
display:flex;
align-items: center;
justify-content: center;

`
const LoginWrapp = styled.div`
width: 70%;
height: 70%;
display: flex;
`
const LoginGauche = styled.div`
flex: 1;
display: flex;
flex-direction: column;
justify-content: center;
width:100%;
height: 100%; 
`
const LoginLogo = styled.img`
max-height: 100%
max-width : 100%;
`
const LoginDroit = styled.div`
flex: 1;
display: flex;
flex-direction: column;
justify-content: center;
`
const LoginBox = styled.form`
height: 300px;
padding: 20px;
background-color: ${colors.secondaire};
border-radius: 10px;
display: flex;
flex-direction: column;
justify-content: space-between;
`
const EmailMdp = styled.input`
height: 50px;
border-radius: 10px; 
border: 1px solid grey;
font-size: 12pt;
padding-left: 20px;
&:focus{
    outline: none;
}
`
const LoginButton = styled.button`
height: 50px;
border-radius: 10px;
border: none;
background-color : ${colors.primaire};
color: ${colors.blanc};
font-size: 12pt;
font-weight: 700;
cursor: pointer;
&:hover{
        opacity: 0.7;
}
`
const LoginEnregistrementBtn = styled(LoginButton)`
background-color: ${colors.tertiaire};
width: 200px; 
align-self: center; 
transition: 200ms;
`

export default function Login(){
    const email = useRef();
    const password = useRef();
    const {user, isFetching, error, dispatch} = useContext(AuthContext);

    const handleClick = async (e) =>{
        e.preventDefault();
        loginCall({email:email.current.value, password:password.current.value}, dispatch )
        
    };

    console.log(user);

    return(
        <LogIn>
            <LoginWrapp>
                <LoginGauche>
                    <LoginLogo src={Logo} alt="Logo Groupomania"/>
                </LoginGauche>
                <LoginDroit>
                    <LoginBox onSubmit={handleClick}>
                        <EmailMdp  placeholder="Email" ref={email} required/>
                        <EmailMdp type="password" placeholder="Mot de passe"  ref={password} required/>
                        <LoginButton>Se connecter</LoginButton>
                        <LoginEnregistrementBtn>
                            Créer un nouveau compte
                        </LoginEnregistrementBtn>
                    </LoginBox>
                </LoginDroit>
            </LoginWrapp>
        </LogIn>
    )
}