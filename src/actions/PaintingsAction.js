export const GetCollectionPaintingsAction = (collectionId) => {

  console.log('collection paintings')
  return async dispatch =>{
    const paintings = await fetch(`http://localhost:1337/paintings/${collectionId}`)

    dispatch({
      type: 'GetCollectionPaintingsAction',
      payload: await paintings.json(),
    })
  }
 
}

export const NewPaintingsAction = (currentUser,  paintings) => {
  console.log('paintingsAction', paintings)
  return async dispatch => {
    const painting = await fetch('http://localhost:1337/paintings/', {
      method: "POST",
      headers: {"Content-Type": "application/json", "auth-token": currentUser.token},
      body: JSON.stringify({paintings: paintings})
    })

    dispatch({
      type: 'NewPaintingsAction',
      payload: await painting.json(),
    })
  }
} 

export const UpdatePaintingsAction = (paintings, currentUser) => {
  console.log(paintings)
  return async dispatch => {
    const painting = await fetch('http://localhost:1337/paintings/', {
      method: "PATCH",
      headers: {"Content-Type": "application/json", "auth-token": currentUser.token},
      body: JSON.stringify({paintings: paintings})
    })

    dispatch({
      type: 'NewPaintingsAction',
      payload: await painting.json(),
    })
  }
  
}