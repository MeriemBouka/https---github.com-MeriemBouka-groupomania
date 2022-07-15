import React from 'react'
import styled from 'styled-components'
import colors from '../utils/colors'
import logo from '../assets/icon-left-font-monochrome-white.svg'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = styled.header`
  max-width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 40px;
  background-color: ${colors.primaire};
`
const Logo = styled.img`
  height: 40px;
  padding-left: 5px;
`

const Menu = styled.nav`
  color: white;
`

export default function Topbar({ user }) {
  if (localStorage.getItem('userId') == null) {
    const notConnect = false
  }

  const deconnexion = () => {
    localStorage.clear()
    window.location.reload()
  }
  return (
    <>
      <Header>
        <Logo src={logo} alt="logo Groupomania" />
        <Menu>
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            size="xl"
            style={{ cursor: 'pointer' }}
            onClick={deconnexion}
          />
        </Menu>
      </Header>
    </>
  )
}
