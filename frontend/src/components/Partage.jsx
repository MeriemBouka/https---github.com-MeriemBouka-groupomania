import React, {useContext, useRef, useState} from "react"
import styled from "styled-components"
import profileImg from "../../src/assets/profil.png"
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import colors from "../utils/colors"
import {AuthContext} from "./context/AuthContext"
import FormData from 'form-data'
import axios from "axios"


const Partager = styled.div`
width: 100%;
height: 200px;
border-radius: 10px;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
background-color : ${colors.blanc};
margin-top: 30px;
`
const PartageWrap = styled.form`
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
const PartageOption = styled.label`
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
    const {user} = useContext(AuthContext)
    const text = useRef();
    return(
        <Partager>
            <PartageWrap>
                <PartageTop>
                    <ImgProfile src={user.imgUrl ? user.imgUrl : profileImg} alt="" />
                    <PartageInput placeholder={"Quoi de neuf "+ user.login+"?" }ref={text}/>
                </PartageTop>
                <PartageHr/>
                <PartageBottom>
                    <PartageOption htmlFor="file">
                            <FontAwesomeIcon icon={faImages} size="2x" style={{ color: `${colors.primaire}` }}/>
                            <PartageOptionText>Photo</PartageOptionText>
                            <input type="file" id="file" accept=".png, .jpeg, .jpg" style={{display:"none"}}/>
                    </PartageOption>
                    <PartageBoutton type="submit">Publier</PartageBoutton>
                </PartageBottom>
            </PartageWrap>
        </Partager>
    )
}