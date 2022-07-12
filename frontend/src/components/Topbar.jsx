import React from 'react' 
import styled from 'styled-components'
import colors from '../utils/colors' 
import logo from '../assets/icon-left-font-monochrome-white.svg'
import { faArrowRightFromBracket, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom"

const Header = styled.header`
max-width:100%;
display : flex;
justify-content: space-between;
background-color: ${colors.primaire};
padding:0.5rem 0.5rem;
`
const Logo = styled.img`
height : 30px;
`;

const Menu = styled.nav`
width:30%;
display: flex;
justify-content: space-around;
color: white;
`

const Blur = styled.div`
  position: absolute;
  width: 22rem;
  height:14rem;
  border-radius: 50%;
  background-color: ${colors.secondaire};  
  filter : blur(72px);
`

export default function Topbar(){
  const deconnexion = () =>{
  localStorage.clear();
   window.location.reload();
  }
return(
    <nav className="topbarContainer">
        <div className="topbarLeft">
           <Header>
            <Link to="/">
              <Logo src={logo} alt="logo Groupomania"/>
            </Link>
              <Menu>               
                <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" style={{cursor:'pointer'}} onClick={deconnexion}/>
              </Menu>
          </Header> 
             <Blur style ={{top : '36%', right:'-8'}}></Blur>
        </div>
        <div className="topbarRight">
         
        </div>
      
    </nav>
)
}