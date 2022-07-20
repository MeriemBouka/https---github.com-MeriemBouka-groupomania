import React, { useContext, useRef, useState } from 'react'
import styled from 'styled-components'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import colors from '../utils/colors'
import { AuthContext } from './context/AuthContext'
import axios from 'axios'

const Partager = styled.div`
  width: 100%;
  height: 180px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  background-color: ${colors.blanc};
  margin-top: 30px;
`
const PartageWrap = styled.form`
  padding: 10px;
`
const PartageTop = styled.div`
  display: flex;
  align-items: end;
`
const PartageInput = styled.input`
  padding-top: 30px;
  padding-left: 20px;
  font-size: 14pt;
  border: none;
  width: 80%;
  font-weight: 400;
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
  margin: 20px;
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
const File = styled.input`
  display: none;
`

export default function Modal({ publication }) {
  const { user } = useContext(AuthContext)
  const text = useRef()
  const [image, setImage] = useState(null)

  const submitHandler = async (e) => {
    e.preventDefault()
    const post = {
      userId: user.userId,
      text: text.current.value,
    }

    const data = new FormData()
    data.append('image', image)
    data.append('post', JSON.stringify(post))

    const tokenAcces = user.token
    if (image) {
      if (text.current.value === '') {
        const post = {
          userId: user.userId,
          text: publication.text,
        }

        const data = new FormData()
        data.append('image', image)
        data.append('post', JSON.stringify(post))
        await axios
          .put('/publication/' + publication._id, data, {
            headers: {
              Authorization: 'Bearer ' + tokenAcces,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            if (response.data.message) {
              window.location.reload()
            }
          })
          .catch((e) => {
            console.log(e)
          })
      } else {
        await axios
          .put('/publication/' + publication._id, data, {
            headers: {
              Authorization: 'Bearer ' + tokenAcces,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            if (response.data.message) {
              window.location.reload()
            }
          })
          .catch((e) => {
            console.log(e)
          })
      }
    } else {
      await axios
        .put('/publication/' + publication._id, post, {
          headers: {
            Authorization: 'Bearer ' + tokenAcces,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          if (response.data.message) {
            window.location.reload()
          }
        })
        .catch((e) => {
          console.log('Error: ', e.message)
        })
    }
  }

  return (
    <Partager>
      <PartageWrap
        enctype="multipart/form-data"
        onSubmit={submitHandler}
        method="Put"
      >
        <PartageTop data={user.userId}>
          <PartageInput
            ref={text}
            id="content"
            name="content"
            placeholder={publication.text}
          />
        </PartageTop>

        <PartageHr />
        <PartageBottom>
          <PartageOption htmlFor="file">
            <FontAwesomeIcon
              icon={faImages}
              size="2x"
              style={{ color: `${colors.primaire}` }}
            />
            <PartageOptionText>Photo</PartageOptionText>
            <File
              id="file"
              type="file"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </PartageOption>
          <PartageBoutton type="submit">Publier</PartageBoutton>
        </PartageBottom>
      </PartageWrap>
    </Partager>
  )
}
