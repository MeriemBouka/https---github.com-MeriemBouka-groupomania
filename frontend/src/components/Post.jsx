import React from "react";
import styled from "styled-components"
import { faEllipsisVertical, faHeart, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfilImg from "../assets/20456790.png" 
import Fleur from "../assets/fleur.png"
import colors from "../utils/colors"

const Poster = styled.div`
width: 100%;
border-radius: 10px;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
margin: 30px 0;
`
const PostWrapp = styled.div`
padding: 10px;
`
const PostHaut = styled.div`
display: flex; 
align-items: center;
justify-content: space-between;
`
const PostHautDroit = styled.div`
width: 15px;
cursor: pointer;
`
const PostHautGauche = styled.div`
display: flex;
align-items: center;
`
const PostImgProfil = styled.img`
width: 40px;
height: 40px;
border-radius: 50px;
object-fit: cover
`
const PostLogin = styled.span`
font-size: 16pt;
font-weight: 400;
margin: 0 10px;
`
const PostDate = styled.span`
font-size : 12pt;
`
const PostCentre = styled.div`
margin: 20px 0;
`
const PostText = styled.span`

`
const PostImg = styled.img`
margin-top: 20px;
width: 100%;
max-height: 500px;
object-fit: contain;
`
const PostBas = styled.div`
display: flex;
ilign-items: center;
justify-content: space-between;
`
const PostBasGauche = styled.div`
display: flex;
align-items: center;
`
const PostCompteur = styled.span`

`
const PostBasDroit = styled.div`
border-bottom-style: dotted;
cursor : pointer;
`
export default function Post(){
    return(
        <Poster>
            <PostWrapp>
                <PostHaut>
                    <PostHautGauche>
                        <PostImgProfil src={ProfilImg} alt="Image du propriètaire de la publication" />
                        <PostLogin>Login</PostLogin>
                        <PostDate>1 jour</PostDate>
                    </PostHautGauche>
                
                <PostHautDroit>
                    <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
                </PostHautDroit>
                </PostHaut>
                <PostCentre>
                    <PostText>Bonne journée à toutes et à tous !!!</PostText>
                    <PostImg src={Fleur} alt="image postée" />
                </PostCentre>
                <PostBas>
                    <PostBasGauche>
                        <FontAwesomeIcon icon={faThumbsUp} size="lg" style={{ color: `${colors.tertiaire}`, cursor: 'pointer', marginRight:'15px' }}/>
                        <FontAwesomeIcon icon={faHeart} size="lg" style={{ color: `red` }}/>
                        <PostCompteur>30M</PostCompteur>
                    </PostBasGauche>
                    <PostBasDroit>3 commentaires</PostBasDroit>
                </PostBas>
            </PostWrapp>
        </Poster>
    )
}