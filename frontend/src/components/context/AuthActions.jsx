export const loginStart = (userIdentifiants) => ({
  type: 'LOGIN_START',
})

export const loginSucces = (user) => ({
  type: 'LOGIN_SUCCES',
  payload: user,
})

export const loginFalure = (error) => ({
  type: 'LOGIN_FALURE ',
  payload: error,
})
