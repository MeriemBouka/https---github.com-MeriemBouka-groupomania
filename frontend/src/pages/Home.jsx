import React from "react"
import Topbar from "../components/topbar/Topbar"
import Sidebar from "../components/Sidebar"
import Feed from "../components/Feed"
import styled from "styled-components"

const Homee = styled.div`
position: relative;
display: grid;
grid-template-columns: 30rem auto 2rem;`

export default function Home(){
    return (
        <div>
        <Topbar/>
    <Homee>
        <Sidebar></Sidebar>
        <Feed></Feed>
    </Homee>
    </div>
   
    )
}