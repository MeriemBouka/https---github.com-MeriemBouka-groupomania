import styled from "styled-components"
import imageProfil from "../assets/0b40b35a17822a88bb6baa8f8b4ce32a.jpg"
import colors from "../../src/utils/colors"

const ProfileCard = styled.aside`
width : 20rem;
height : 270px;
border-radius: 1.5rem;
display: flex;
flex-direction: column;
position: relative;
gap: 1rem;
background-color: ${colors.blanc};
margin: 100px 0 0 10px;
box-shadow: 2px 3px 10px gray;
 transition: 400ms;
 &:hover {
        cursor: pointer;
        box-shadow: 2px 2px 10px #e2e3e9;
    }
`

const ImgProfile = styled.img `
position: absolute;
bottom : 13rem;
height: 150px;
width: 150px;
margin: 10px;
border-radius:50%;
box-shadow: 2px 3px 10px gray;
margin: 0 26% 
`
const ProfileCardInfo = styled.div `
display: flex;
flex-direction:column;
align-items: center;
margin-top : 3rem;
`
const Login = styled.span `
padding-top : 20px;
font-size :16pt;
`
const ProfileCardElements = styled.div `
 padding-top: 60px;
 gap : 2rem;
 text-align:center;`

const ProfileCardLink = styled.div `
color : ${colors.primaire};
text-decoration : none;
padding-bottom: 30px;
&:hover{
    color : ${colors.secondaire};
}`

const ProfileCardLinkBlack = styled(ProfileCardLink) `
color :black;
&:hover{
    color : ${colors.tertiaire};
}`


export default function Sidebar(){
    return (
<ProfileCard>
    <div>
       <ImgProfile src={imageProfil} alt="Image de profil"/> 
    </div>
    <ProfileCardInfo>
            <Login>Login</Login>
        <ProfileCardElements>
            <ProfileCardLink href="#" title="lien pour atteindre mon profil">Mon profil</ProfileCardLink>
            <ProfileCardLinkBlack href="#" title="lien pour me déconnecter">Déconnexion</ProfileCardLinkBlack>
        </ProfileCardElements>
    </ProfileCardInfo>
</ProfileCard>
    )
}
