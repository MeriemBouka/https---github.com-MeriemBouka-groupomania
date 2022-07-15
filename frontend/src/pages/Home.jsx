import React from 'react'
import Topbar from '../components/Topbar'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'
import styled from 'styled-components'
import { AuthContext } from '../components/context/AuthContext'

const Homee = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 480px auto 32px;
  @media (max-width: 800px) {
    grid-template-columns: none;
  }
`

export default function Home() {
  return (
    <div>
      <Topbar />
      <Homee>
        <Sidebar></Sidebar>
        <Feed></Feed>
      </Homee>
    </div>
  )
}
