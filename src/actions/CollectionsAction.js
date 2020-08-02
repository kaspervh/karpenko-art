// gets all collections
export const GetCollectionsAction = () =>{
  return async dispatch => {
    const collections = await fetch('https://karpenko-art-backend.azurewebsites.net/collections/')

    dispatch({
      type: 'GetAllCollections',
      payload: await collections.json()
    })
  }
}

export const GetCollectionAction = (currentUser, collectionId) => {
  return async dispatch => {
    const collection = await fetch(`http://localhost:1337/collections/${collectionId}`, {
      method: 'GET',
      headers: {"Content-Type": "application/json", "auth-token": currentUser.token}
    });

    dispatch({
      type: 'GetCollectionAction',
      payload: await collection.json(),
    })
  }
}

export const NewCollectionAction = (name, currentUser) => {
  return async dispatch => {
    const collection = await fetch('https://karpenko-art-backend.azurewebsites.net/collections/',{
      method: "POST",
      headers: {"Content-Type": "application/json", "auth-token": currentUser.token},
      body: JSON.stringify({name: name, userId: currentUser.id})
    })

    dispatch({
      type: 'NewCollectionAction',
      payload: await collection.json(),
    })
  }
}