const PaintingsReducer = (state = [], action) => {
  switch(action.type){
    case 'NewPaintingsAction':
      return state = action.payload;
    case 'GetCollectionPaintingsAction':
      return state = action.payload;
    default:
      return state
  }
} 

export default PaintingsReducer;