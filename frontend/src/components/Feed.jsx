import React, { useState, useEffect, useContext } from 'react'
import Partage from './Partage'
import Post from './Post'
import axios from 'axios'
import { AuthContext } from './context/AuthContext'
import styled from 'styled-components'

const Article = styled.article``

export default function Feed() {
  const [posts, setPosts] = useState([])
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const fetchPosts = async () => {
      const tokenAcces = user.token
      const res = await axios.get('/publication/?userId=' + user.userId, {
        headers: {
          Authorization: 'Bearer ' + tokenAcces,
          'Content-Type': 'application/json'
        }
      })
      setPosts(
        res.data.sort((firstPost, secPost) => {
          return (
            new Date(secPost.creationDate) - new Date(firstPost.creationDate)
          )
        })
      )
    }
    fetchPosts()
  }, [])
  return (
    <Article>
      <Partage />

      {posts.map(p => (
        <Post key={p._id} post={p} />
      ))}
    </Article>
  )
}
