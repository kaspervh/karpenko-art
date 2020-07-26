const saveToLocalStorage = (payload) => {
  try {
    if(payload.message == "user is logged in"){
      const localStoragePayload = JSON.stringify(payload)
      sessionStorage.setItem('currentUser', localStoragePayload)
    }
  } catch (error) {
    console.log(error)
  }
}

const loadCurrentUser = () => {
  try {
    const localStoragePayload = sessionStorage.getItem('currentUser');
    console.log(localStoragePayload)
    if(localStoragePayload === null){return ''}
    return JSON.parse(localStoragePayload)
  } catch (error) {
    console.log(error)
  }
}

const destroyCurrentUser = () => {
  try {
    localStorage.removeItem('currentUser');
  } catch (error) {
    console.log(error)
  }
}


// this is the reducer function
const CurrentUserReducer = (state = loadCurrentUser(), action) => {
  switch(action.type){
    case 'CurrentUserAction':
      saveToLocalStorage(action.payload)
      return state = action.payload;
    case 'LogOutCurrentUser':
      destroyCurrentUser();
      return state = '';
    default: 
      return state;
  }
}

export default CurrentUserReducer;