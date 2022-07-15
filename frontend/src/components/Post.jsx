import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProfilImg from '../assets/profil.png'
import colors from '../utils/colors'
import axios from 'axios'
import { AuthContext } from '../components/context/AuthContext'
import TimeAgo from 'react-timeago'
import frenchStrings from 'react-timeago/lib/language-strings/fr'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import Modal from './Modal'

const formatter = buildFormatter(frenchStrings)

const Poster = styled.div`
  width: 80%;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  margin: 30px 0;
  @media (max-width: 800px) {width: calc(90%);
    margin-left: 5%;
`
const PostWrapp = styled.div`
  padding: 20px;
`
const PostHaut = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const PostHautDroit = styled.div``
const PostHautGauche = styled.div`
  display: flex;
  align-items: center;
`
const PostImgProfil = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  object-fit: cover;
`
const PostLogin = styled.span`
  font-size: 16pt;
  font-weight: 400;
  margin: 0 10px;
`
const PostDate = styled.span`
  font-size: 12pt;
`
const PostCentre = styled.div`
  margin: 30px 0;
`
const PostText = styled.span`
  font-size: 14pt;
  margin-left: 10px;
  @media (max-width: 800px) {
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
    text-overflow: ellipsis;
  }
`
const PostImg = styled.img`
  margin-top: 20px;
  width: 100%;
  max-height: 300px;
  object-fit: contain;
`
const PostBas = styled.div`
  display: flex;
  ilign-items: center;
  justify-content: space-between;
  padding: 5px 0;
`
const PostBasGauche = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  margin-right: 25px;
`
const PostBasDroit = styled(PostBasGauche)``
const WrapButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
`
const PostCompteur = styled.span``

const ModifyPost = styled.button`
  width: 83px;
  margin-left: 5px;
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

const DeletePost = styled(ModifyPost)``

export default function Post({ post }) {
  const [user, setUser] = useState({})
  const [like, setLike] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(false)
  const { user: currentUser } = useContext(AuthContext)
  const [isShow, setIsShow] = useState(true)

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser.userId))
  }, [currentUser.id, post.likes])

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`users/${post.userId}`)
      setUser(res.data)
    }

    fetchUser()
  }, [post.userId])

  const likeHandler = () => {
    try {
      const tokenAcces = currentUser.token
      axios.put(
        '/publication/' + post._id + '/like',
        { userId: currentUser.userId },
        {
          headers: {
            Authorization: 'Bearer ' + tokenAcces,
            'Content-Type': 'application/json'
          }
        }
      )
    } catch (err) {}

    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
  }
  const UpdatePost = () => {
    if (post.userId == currentUser.userId || currentUser.isAdmin == true)
      return true
  }

  const deletePost = async e => {
    e.preventDefault()
    try {
      const tokenAcces = currentUser.token
      await axios.delete(
        '/publication/' + post._id + '?userId=' + currentUser.userId,
        {
          headers: {
            Authorization: 'Bearer ' + tokenAcces
          }
        }
      )
      window.location.reload()
    } catch (err) {}
  }
  const modifyPost = async e => {
    e.preventDefault()
    setIsShow(!isShow)
  }

  return (
    <Poster>
      <PostWrapp>
        <PostHaut>
          <PostHautGauche>
            <PostImgProfil
              src={user.userImg || `${ProfilImg}`}
              alt="Image du propriètaire de la publication"
            />
            <PostLogin>{user.login}</PostLogin>
          </PostHautGauche>

          <PostHautDroit>
            <PostDate>
              <TimeAgo date={post.creationDate} formatter={formatter} />
            </PostDate>
          </PostHautDroit>
        </PostHaut>
        <PostCentre>
          <PostText>{post.text}</PostText>
          <PostImg src={post.imgUrl} alt="image postée" />
        </PostCentre>
        <PostBas>
          <PostBasGauche>
            <FontAwesomeIcon
              icon={faThumbsUp}
              size="xl"
              style={{
                color: `${colors.tertiaire}`,
                cursor: 'pointer',
                marginRight: '15px'
              }}
              onClick={likeHandler}
            />
            <FontAwesomeIcon
              icon={faHeart}
              size="xl"
              style={{ color: `red` }}
            />
            <PostCompteur>{like}</PostCompteur>
          </PostBasGauche>
          <PostBasDroit>
            {UpdatePost() ? (
              <WrapButton>
                <ModifyPost onClick={modifyPost}>Modifier</ModifyPost>
                <DeletePost onClick={deletePost}>Supprimer</DeletePost>
              </WrapButton>
            ) : null}
          </PostBasDroit>
        </PostBas>
      </PostWrapp>
      <>{!isShow ? <Modal publication={post} isShow={!isShow} /> : <></>}</>
    </Poster>
  )
}
