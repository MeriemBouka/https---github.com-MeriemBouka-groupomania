import React from "react"
import styled from "styled-components"
import Logo from "../assets/icon-left-font.svg"
import colors from "../utils/colors"

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
const LoginBox = styled.div`
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
`
const LoginEnregistrementBtn = styled(LoginButton)`
background-color: #64af30;
width: 200px; 
align-self: center; 
`

export default function Login(){
    return(
        <LogIn>
            <LoginWrapp>
                <LoginGauche>
                    <LoginLogo src={Logo} alt="Logo Groupomania"/>
                </LoginGauche>
                <LoginDroit>
                    <LoginBox>
                        <EmailMdp placeholder="Email"/>
                        <EmailMdp placeholder="Mot de passe"/>
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