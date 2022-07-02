import React from "react"
import styled from "styled-components"
import ProfileImg from "../../src/assets/0b40b35a17822a88bb6baa8f8b4ce32a.jpg" 
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import colors from "../utils/colors"


const Partager = styled.div`
width: 100%;
height: 200px;
border-radius: 10px;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
background-color : ${colors.blanc};
margin-top: 30px;
`
const PartageWrap = styled.div`
padding :10px;
`
const PartageTop = styled.div`
display: flex;
align-items: end;
`
const ImgProfile = styled.img`
width: 80px;
height: 80px;
border-radius: 50%;
object-fit: cover;
margin-right: 10px;
`
const PartageInput = styled.input`
font-size: 14pt;
border: none;
width: 80%;
font-weight: 400;
&:focus{
    outline: none;
}
`
const PartageBottom = styled.div`
display: flex;
align-items: center;
justify-content : space-between;
`
const PartageHr = styled.hr`
margin : 20px;
`
const PartageOption = styled.div`
display: flex;
align-items: center;
margin-left: 15px;
cursor: pointer;
`
const PartageOptionText = styled.span`
font-size: 16px;
font-weight: 700;
`
const PartageBoutton = styled.button`
border: none;
padding: 10px;
border-radius: 5px;
font-weight: 700;
margin-right: 15px;
background-color: ${colors.primaire};
color: ${colors.blanc};
transition : 200ms;
&:hover{
    background-color: ${colors.secondaire};
color: ${colors.primaire};
} 
`

export default function Partage(){
    return(
        <Partager>
            <PartageWrap>
                <PartageTop>
                    <ImgProfile src={ProfileImg} alt="" />
                    <PartageInput placeholder="Quoi de neuf ?" />
                </PartageTop>
                <PartageHr/>
                <PartageBottom>
                    <PartageOption>
                            <FontAwesomeIcon icon={faImages} size="2x" style={{ color: `${colors.primaire}` }}/>
                            <PartageOptionText>Photo</PartageOptionText>
                    </PartageOption>
                    <PartageBoutton>Publier</PartageBoutton>
                </PartageBottom>
            </PartageWrap>
        </Partager>
    
    )
}