const CollectionsReducer = (state = [], action) => {
  switch(action.type){
    case 'GetAllCollections':
      return state = action.payload;
    case 'GetCollectionAction':
      return state = action.payload;
    case 'NewCollectionAction':
      return state = {...action.payload}
    default:
      return state;
  }
}

export default CollectionsReducer;