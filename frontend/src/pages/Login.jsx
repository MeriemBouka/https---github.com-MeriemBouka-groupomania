import React, { useRef, useContext, useState } from 'react'
import styled from 'styled-components'
import Logo from '../assets/icon-left-font.svg'
import colors from '../utils/colors'
import { loginCall } from '../../src/apiCalls'
import { AuthContext } from '../components/context/AuthContext'
import { Link } from 'react-router-dom'
import Topbar from '../components/Topbar'

const LogIn = styled.div`
  width: 100%;
  height: 85vh;
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
  }
`
const LoginLogo = styled.img`
height: 100%
width : 100%;

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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:focus {
    outline: none;
  }
`
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
const ErrorMsg = styled.div`
  color: red;
  font-weight: 700;
`

export default function Login() {
  const email = useRef()
  const password = useRef()
  const [mailServError, setMailServError] = useState('')
  const [mdpServError, setMdpServError] = useState('')
  const [accesInterdit, setAccesInterdit] = useState('')
  const { error, dispatch } = useContext(AuthContext)

  const handleClick = async (e) => {
    e.preventDefault()

    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    )

    console.log(error.message === 'Request failed with status code 429')

    if (error.message === 'Request failed with status code 400') {
      setMailServError('Utilisateur non trouvé !!')
    }
    if (error.message === 'Request failed with status code 401') {
      setMdpServError(' Mot de passe incorrect !')
    }
    if (error.message === 'Request failed with status code 429') {
      setAccesInterdit('Compte bloqué pour 1 minute')
    }
  }

  let errorMail

  if (mailServError) {
    errorMail = <ErrorMsg>{mailServError}</ErrorMsg>
  }

  let errorMdp

  if (mdpServError) {
    errorMdp = <ErrorMsg>{mdpServError}</ErrorMsg>
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
                type="email"
                placeholder="Email"
                ref={email}
                pattern="^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$"
                title=" L'adresse Email n'est pas valide"
                required
              />
              {errorMail}

              <EmailMdp
                type="password"
                placeholder="Mot de passe"
                ref={password}
                pattern="^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$"
                title=" Le mot de passe doit contenir au moins : 8 caractères, 1 majuscule, 1 chiffre."
                required
              />
              {errorMdp}

              <LoginButton type="submit">
                {accesInterdit ? accesInterdit : 'Se connecter'}
              </LoginButton>
              <LoginEnregistrementBtn>
                <Link
                  to="/signup"
                  style={{ textDecoration: 'none', color: `${colors.blanc}` }}
                >
                  Créer un nouveau compte
                </Link>
              </LoginEnregistrementBtn>
            </LoginBox>
          </LoginDroit>
        </LoginWrapp>
      </LogIn>
    </>
  )
}
