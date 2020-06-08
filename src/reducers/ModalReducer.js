const ModalReducer = (state, action) =>{
  switch(action.type){
    case 'ShowModalAction':
      return state = true;
    case 'HideModalAction':
      return state = false;
    default:
      return state = false
  }
}

export default ModalReducer;