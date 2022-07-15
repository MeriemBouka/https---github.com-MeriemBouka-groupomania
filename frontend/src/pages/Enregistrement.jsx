import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import Logo from '../assets/icon-left-font.svg'
import colors from '../utils/colors'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import Topbar from '../components/Topbar'

const LogIn = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.blanc};
  display: flex;
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
  width: 100%;
  height: 100%;
  @media (max-width: 800px) {
    display: none;
    @media (max-width: 800px) {
      display: none;
    }
  }
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
  height: 350px;
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
  &:focus {
    outline: none;
  }
`
const ErrorMsg = styled.div`
  color: red;
  font-weight: 700;
`

const ErrorMdp = styled(ErrorMsg)``

const LoginButton = styled.button`
  height: 50px;
  border-radius: 10px;
  border: none;
  background-color: ${colors.primaire};
  color: ${colors.blanc};
  font-size: 12pt;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`
const LoginEnregistrementBtn = styled(LoginButton)`
  background-color: ${colors.tertiaire};
  width: 200px;
  align-self: center;
  transition: 200ms;
`

export default function Enregistrement() {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const regexLogin = /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,20}$/
  const regexMdp = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/
  const [error, setError] = useState('')
  const [errorLogin, setErrorLogin] = useState('')
  const [userName, setUserName] = useState('')
  const [mail, setMail] = useState('')
  const [mdp, setMdp] = useState('')
  const [msg, setMsg] = useState('')
  const [msgMdp, setMsgMdp] = useState('')
  const login = useRef()
  const email = useRef()
  const password = useRef()
  const navigate = useNavigate()

  const validEmail = e => {
    setMail(e.target.value)
    if (regex.test(mail) === false) {
      setError('Adresse mail non valide ! ')
    } else {
      setError('')
      return true
    }
  }

  const validLogin = e => {
    setUserName(e.target.value)
    if (regexLogin.test(userName) === false) {
      setErrorLogin('Login non valide')
    } else {
      setErrorLogin('')
      return true
    }
  }
  const validMdp = e => {
    setMdp(e.target.value)
    if (regexMdp.test(mdp) === false) {
      setMdp('Mot de passe  non valide')
    } else {
      setMdp('')
      return true
    }
  }

  const handleClick = async e => {
    e.preventDefault()
    const user = {
      login: login.current.value,
      email: email.current.value,
      password: password.current.value
    }
    try {
      await axios.post('/auth/signup', user)
      navigate('/login')
    } catch (error) {
      console.log(error.message)
      if (error.response.status === 400) {
        setMsg('adresse mail déjà utilisée! ')
      }
      console.log(error.response.status)
      if (error.response.status === 401) {
        setMsgMdp('Mot de passe non sécurisé !')
      }
    }
  }

  let erreurLog
  if (errorLogin) {
    erreurLog = <ErrorMsg>{errorLogin}</ErrorMsg>
  }
  let erreur
  if (error) {
    erreur = <ErrorMsg>{error}</ErrorMsg>
  } else if (msg) {
    erreur = <ErrorMsg>{msg}</ErrorMsg>
  }
  let erreurMdp

  if (msgMdp) {
    erreurMdp = <ErrorMsg>{msgMdp}</ErrorMsg>
  } else if (mdp && msgMdp) {
    erreurMdp = <ErrorMsg>{mdp}</ErrorMsg>
  }

  return (
    <>
      <>
        <Topbar />
      </>

      <LogIn>
        <LoginWrapp>
          <LoginGauche>
            <LoginLogo src={Logo} alt="Logo Groupomania" />
          </LoginGauche>
          <LoginDroit>
            <LoginBox onSubmit={handleClick}>
              <EmailMdp
                placeholder="Nom d'utilisateur"
                ref={login}
                required
                maxlength="20"
                onChange={validLogin}
              />
              <ErrorMsg>{erreurLog}</ErrorMsg>
              <EmailMdp
                type="email"
                placeholder="Email"
                ref={email}
                onChange={validEmail}
                required
              />
              <ErrorMsg>{erreur}</ErrorMsg>
              <EmailMdp
                type="password"
                placeholder="Mot de passe"
                minLength="8"
                ref={password}
                onChange={validMdp}
                required
              />
              <ErrorMdp>{erreurMdp}</ErrorMdp>
              <LoginButton type="submit">S'inscrire</LoginButton>
              <LoginEnregistrementBtn>
                <Link
                  to="/login"
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  Se connecter
                </Link>
              </LoginEnregistrementBtn>
            </LoginBox>
          </LoginDroit>
        </LoginWrapp>
      </LogIn>
    </>
  )
}
