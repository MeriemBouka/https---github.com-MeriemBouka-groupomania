import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import Logo from '../assets/icon-left-font.svg'
import colors from '../utils/colors'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import Topbar from '../components/Topbar'

const LogIn = styled.div`
  width: 100%;
  height: 80vh;
  background-color: ${colors.blanc};
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 800px) {
    max-height: 80vh;
  }
`
const LoginWrapp = styled.div`
  width: 70%;
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
const LoginLogo = styled.img``
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  const regexLogin = /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,20}$/
  const regexMdp = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+*!=]).*$/
  const [errorMail, setErrorMail] = useState('')
  const [errorLogin, setErrorLogin] = useState('')
  const [userName, setUserName] = useState('')
  const [mail, setMail] = useState('')
  const [mdp, setMdp] = useState('')
  const [mdpServError, setMdpServError] = useState('')
  const [mailServError, setMailServError] = useState('')
  const [loginServError, setLoginServError] = useState('')
  const [errorMdp, setErrorMdp] = useState('')
  const login = useRef()
  const email = useRef()
  const password = useRef()
  const navigate = useNavigate()

  const validEmail = (e) => {
    setMail(e.target.value)
    if (regex.test(mail) === false || mail === '') {
      setErrorMail('Adresse mail non valide ! ')
    } else {
      setErrorMail('')
      return true
    }
  }

  const validLogin = (e) => {
    e.preventDefault()
    setUserName(e.target.value)
    if (regexLogin.test(userName) === false || userName === '') {
      setErrorLogin('Login non valide')
    } else {
      setErrorLogin('')
      return true
    }
  }
  const validMdp = (e) => {
    e.preventDefault()
    setMdp(e.target.value)
    if (regexMdp.test(mdp) === false || mdp === '') {
      setErrorMdp('min 8 caractères, 1 majuscule, 1 chiffre.')
    } else {
      return true
    }
  }

  const handleClick = async (e) => {
    e.preventDefault()
    const user = {
      login: login.current.value,
      email: email.current.value,
      password: password.current.value,
    }
    try {
      await axios.post('/auth/signup', user)
      navigate('/login')
    } catch (error) {
      console.log(error.response.data.error)
      if (error.response.data.error === "Nom d'utilisateur existant") {
        setLoginServError("Nom d'utilisateur déjà existant!")
      }
      console.log(error.message)
      if (error.response.status === 400) {
        setMailServError('adresse mail déjà utilisée! ')
      }
      console.log(error.response.status)
      if (error.response.status === 401) {
        setMdpServError('Mot de passe non sécurisé !')
      }
    }
  }

  let erreurLog
  if (errorLogin) {
    erreurLog = <ErrorMsg>{errorLogin}</ErrorMsg>
  } else {
    erreurLog = <ErrorMsg>{loginServError}</ErrorMsg>
  }
  let erreur
  if (errorMail) {
    erreur = <ErrorMsg>{errorMail}</ErrorMsg>
  } else if (mailServError) {
    erreur = <ErrorMsg>{mailServError}</ErrorMsg>
  }
  let erreurMdp
  if (mdpServError) {
    erreurMdp = <ErrorMsg>{mdpServError}</ErrorMsg>
  } else {
    erreurMdp = <ErrorMsg>{errorMdp}</ErrorMsg>
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
              {erreurLog}
              <EmailMdp
                type="email"
                placeholder="Email"
                ref={email}
                onChange={validEmail}
                required
              />
              {erreur}
              <EmailMdp
                type="password"
                placeholder="min 8 caractères, 1 majuscule, 1 chiffre."
                minLength="8"
                ref={password}
                onChange={validMdp}
                required
              />
              {erreurMdp}
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
