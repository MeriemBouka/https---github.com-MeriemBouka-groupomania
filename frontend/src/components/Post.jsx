import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProfilImg from '../assets/profil.png'
import colors from '../utils/colors'
import axios from 'axios'
import { format } from 'timeago.js'
import { AuthContext } from '../components/context/AuthContext'

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
  margin: 20px 0;
`
const PostText = styled.span``
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
const PostCompteur = styled.span``

export default function Post({ post }) {
  const [user, setUser] = useState({})
  const [like, setLike] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(false)
  const { user: currentUser } = useContext(AuthContext)

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

  const deletePost = async () => {
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
            <PostDate>{format(post.creationDate)}</PostDate>
          </PostHautGauche>

          <PostHautDroit>
            {UpdatePost() ? <button onClick={deletePost}>Delete</button> : null}
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
              size="lg"
              style={{
                color: `${colors.tertiaire}`,
                cursor: 'pointer',
                marginRight: '15px'
              }}
              onClick={likeHandler}
            />
            <FontAwesomeIcon
              icon={faHeart}
              size="lg"
              style={{ color: `red` }}
            />
            <PostCompteur>{like}</PostCompteur>
          </PostBasGauche>
        </PostBas>
      </PostWrapp>
    </Poster>
  )
}
