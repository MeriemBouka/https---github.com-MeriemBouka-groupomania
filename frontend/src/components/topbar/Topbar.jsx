import "./topbar.css"
import styled from 'styled-components'
import colors from '../../utils/colors' 
import logo from '../../assets/logo.png'

const Header = styled.header`
overflow :hidden;
background-color: ${colors.blanc};
padding:1rem 1rem;
`
const Logo = styled.img`
height : 80px;
`;

const Blur = styled.div`
  position: absolute;
  width: 22rem;
  height:14rem;
  border-radius: 50%;
  background-color: ${colors.secondaire};  
  filter : blur(72px);
`

export default function Topbar(){
return(
    <nav className="topbarContainer">
        <div className="topbarLeft">
           <Header><Logo src={logo} alt="logo Groupomania"/></Header> 
             <Blur style ={{top : '-18%', right:'0'}}></Blur>
             <Blur style ={{top : '36%', right:'-8'}}></Blur>
        </div>
        <div className="topbarRight"></div>
      
    </nav>
)
}