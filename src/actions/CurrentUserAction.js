export const CurrentUserAction = (username, password) =>{
  return async dispatch => {
    const login = await fetch("https://karpenko-art-backend.azurewebsites.net/auth/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        username: username, 
        password: password
      })
    })

    dispatch({
      type: 'CurrentUserAction',
      payload: await login.json(),
    })
  }
}

export const LogOutCurrentUserAction = () => {
  return ({
    type: 'logoutCurrentUserAction'
  })
}