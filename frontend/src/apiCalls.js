import axios from 'axios'

export const loginCall = async (userIdentifiants, dispatch) => {
  dispatch({ type: 'LOGIN_START' })
  try {
    const res = await axios.post(
      'http://localhost:3000/api/auth/login',
      userIdentifiants
    )
    dispatch({ type: 'LOGIN_SUCCES', payload: res.data })
  } catch (error) {
    dispatch({ type: 'LOGIN_FALURE', payload: error })
  }
}
