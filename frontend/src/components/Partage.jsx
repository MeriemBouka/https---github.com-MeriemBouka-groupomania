import React, { useContext, useRef, useState } from 'react'
import styled from 'styled-components'
import profileImg from '../../src/assets/profil.png'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import colors from '../utils/colors'
import { AuthContext } from './context/AuthContext'
import axios from 'axios'

const Partager = styled.div`
  width: 80%;
  height: 200px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: ${colors.blanc};
  margin-top: 30px;
  @media (max-width: 800px) {
    width: calc(90%);
    margin-left: calc(5%);
  }
`
const PartageWrap = styled.form`
  padding: 10px;
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
  margin-right: 20px;
`
const PartageInput = styled.input`
  font-size: 14pt;
  border: none;
  width: 80%;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:focus {
    outline: none;
  }
`
const PartageBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const PartageHr = styled.hr`
  margin: 10px;
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
  transition: 200ms;
  &:hover {
    background-color: ${colors.secondaire};
    color: ${colors.primaire};
  }
`
const MsgImage = styled.div`
  margin-top: 5px;
  color: ${colors.primaire};
`
export default function Partage() {
  const { user } = useContext(AuthContext)
  const text = useRef()
  const [image, setImage] = useState(null)
  const [msgImage, setMsgImage] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()
    const post = {
      userId: user.userId,
      text: text.current.value,
    }

    if (image) {
      setMsgImage(<></>)
    } else {
      setMsgImage(<MsgImage>Ajouter une image à votre poste ! </MsgImage>)
    }

    const data = new FormData()
    data.append('image', image)
    data.append('post', JSON.stringify(post))

    const tokenAcces = user.token
    await axios
      .post('/publication/', data, {
        headers: {
          Authorization: 'Bearer ' + tokenAcces,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response.data.message) {
          window.location.reload()
        }
        console.log(response.data.message)
      })
      .catch((e) => {
        console.log('Error: ', e.message)
      })
  }

  return (
    <Partager>
      <PartageWrap
        enctype="multipart/form-data"
        onSubmit={submitHandler}
        method="Post"
      >
        <PartageTop data={user.userId}>
          <ImgProfile src={user.imgUrl ? user.imgUrl : profileImg} alt="" />
          <PartageInput
            placeholder={'Quoi de neuf ' + user.login + '?'}
            ref={text}
            id="content"
            name="content"
          />
        </PartageTop>

        <PartageHr />
        <PartageBottom>
          <PartageOption htmlFor="image">
            <FontAwesomeIcon
              icon={faImages}
              size="2x"
              style={{ color: `${colors.primaire}` }}
            />
            <PartageOptionText>Photo</PartageOptionText>
            <input
              type="file"
              id="image"
              name="image"
              accept=".png, .jpeg, .jpg"
              style={{ display: 'none' }}
              onChange={(e) => setImage(e.target.files[0])}
            />
          </PartageOption>
          <PartageBoutton type="submit">Publier</PartageBoutton>
        </PartageBottom>
        {msgImage}
      </PartageWrap>
    </Partager>
  )
}
