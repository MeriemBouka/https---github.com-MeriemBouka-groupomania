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
  const [mdpServError, setMdpServError] = useState('')
  const [mailServError, setMailServError] = useState('')
  const [loginServError, setLoginServError] = useState('')
  const login = useRef()
  const email = useRef()
  const password = useRef()
  const navigate = useNavigate()

  const premiereLettreMaj = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  const handleClick = async (e) => {
    e.preventDefault()
    const user = {
      login: premiereLettreMaj(login.current.value),
      email: email.current.value,
      password: password.current.value,
    }
    try {
      await axios.post('/auth/signup', user)
      navigate('/login')
    } catch (error) {
      if (error.response.data.error === "Nom d'utilisateur existant") {
        setLoginServError("Nom d'utilisateur déjà existant!")
      }

      if (error.response.status === 400) {
        setMailServError('adresse mail déjà utilisée! ')
      }

      if (error.response.status === 401) {
        setMdpServError('Mot de passe non sécurisé !')
      }
    }
  }

  let erreurLog
  if (loginServError) {
    erreurLog = <ErrorMsg>{loginServError}</ErrorMsg>
  }
  let erreur

  if (mailServError) {
    erreur = <ErrorMsg>{mailServError}</ErrorMsg>
  }
  let erreurMdp
  if (mdpServError) {
    erreurMdp = <ErrorMsg>{mdpServError}</ErrorMsg>
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
                type="text"
                ref={login}
                required
                maxlength="20"
                pattern="^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{0,20}$"
                title=" Le nom d'utilisateur n'est pas valide"
              />
              {erreurLog}
              <EmailMdp
                type="email"
                placeholder="Email"
                ref={email}
                pattern="^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$"
                title=" L'adresse Email n'est pas valide"
                required
              />
              {erreur}
              <EmailMdp
                type="password"
                placeholder="Mot de passe"
                minLength="8"
                ref={password}
                pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$"
                title=" Le mot de passe doit contenir au moins : 8 caractères, 1 majuscule, 1 chiffre."
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
