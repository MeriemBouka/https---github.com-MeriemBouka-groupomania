import React, { useContext } from 'react'
import styled from 'styled-components'
import colors from '../../src/utils/colors'
import { AuthContext } from './context/AuthContext'
import ProfilImg from '../assets/profil.png'

const ProfileCard = styled.aside`
  flex: 4;
  width: 300px;
  height: 270px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 80px;
  gap: 30px;
  background-color: ${colors.blanc};
  margin: 100px 0 0 30px;
  box-shadow: 2px 3px 10px gray;
  transition: 400ms;
  &:hover {
    cursor: pointer;
    box-shadow: 2px 2px 10px #e2e3e9;
  }
  @media (max-width: 800px) {
    display: none;
  }
`

const ImgProfile = styled.img`
  position: absolute;
  bottom: 192px;
  height: 150px;
  width: 150px;
  margin: 10px;
  border-radius: 50%;
  box-shadow: 2px 3px 10px gray;
  margin: 0 26%;
`
const ProfileCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
`
const Login = styled.span`
  padding-top: 20px;
  font-size: 16pt;
`
const ProfileCardElements = styled.div`
  padding-top: 60px;
  gap: 32rem;
  text-align: center;
`

const ProfileCardLinkBlack = styled.div`
  color: ${colors.primaire};
  text-decoration: none;
  padding-bottom: 30px;
  font-size: 14pt;
  &:hover {
    color: ${colors.secondaire};
  }
`

export default function Sidebar() {
  const { user: currentUser } = useContext(AuthContext)
  const deconnexion = () => {
    localStorage.clear()
    window.location.reload()
  }
  return (
    <ProfileCard>
      <div>
        <ImgProfile
          src={currentUser.userImg || `${ProfilImg}`}
          alt="Image de profil"
        />
      </div>
      <ProfileCardInfo>
        <Login>{currentUser.login}</Login>
        <ProfileCardElements>
          <ProfileCardLinkBlack onClick={deconnexion}>
            Déconnexion
          </ProfileCardLinkBlack>
        </ProfileCardElements>
      </ProfileCardInfo>
    </ProfileCard>
  )
}
