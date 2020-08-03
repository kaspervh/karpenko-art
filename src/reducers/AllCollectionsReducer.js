const AllCollectionsReducer = (state = [], action) => {
  switch(action.type){
    case 'GetAllCollections':
      return state = action.payload;
    default:
      return state;
  }
}

export default AllCollectionsReducer;