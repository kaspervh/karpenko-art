import React,{useState, useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {NewCollectionAction} from '../../actions/CollectionsAction';
import {NewPaintingsAction} from '../../actions/PaintingsAction';
import {useHistory} from 'react-router-dom'
import FileBase64 from 'react-file-base64';

const NewCollection = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.CurrentUserReducer);
  const collection = useSelector(state => state.CollectionsReducer);
  const [collectionName, setCollectionName] = useState('');
  const [paintings, setPaintings] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // will trigger when the send button has been pressed an the collection action has fired 
  useEffect(() => {
    console.log(collectionName, collection.name)
    if(collection.name === collectionName){
      if(paintings.length !== 0){
        const newPaintings = [];
        for(let painting of paintings){newPaintings.push({collection_id: collection._id, ...painting})}
        
        dispatch(NewPaintingsAction(
          currentUser,
          newPaintings
        ))
      } 
    }
  },[collection])

  const addPaintingToPaintings = () => {
    const currentPaintings = [...paintings]
    currentPaintings.push({name: '', image_string: '', dimensions: '', medium: '', price: '', description: ''})
    setPaintings(currentPaintings)
  } 

  const setPaintingValues = (key, index, value) =>{
    let pics = [...paintings];
    pics[index][key] = value
    setPaintings(pics);
  }

  const verifyFields = () => {
    if(collectionName.length === 0){return false}
    if(paintings.length !== 0){
      for(let i = 0; i < paintings.length;  i++){
        if(paintings[i].name.length === 0){return false}
        if(paintings[i].image_string.length === 0){return false}
        if(paintings[i].dimensions.length === 0){return false}
        if(paintings[i].medium.length === 0){return false}
        if(paintings[i].price.length === 0){return false}
      }
    }
    return true
  }

  const sendData = () => {
    console.log(verifyFields())
    if(verifyFields() === false ){
      setErrorMessage('Some of the form field are not filled in')
    }else{
      dispatch(NewCollectionAction(collectionName, currentUser));
    }
  }

  // function will use reader object to convert image to base64 string
  // and then push it to the pictures state
  const setImageString = (index, file) => {
    console.log(file[0])
    let reader = new FileReader();
    reader.readAsDataURL(file[0]);
    reader.onload = () => {
      setPaintingValues('image_string', index, reader.result)
    }
  }

  return(
    <div className='container'>
      <h1>New Collection</h1>
      {console.log(errorMessage)}
      {errorMessage.length !== 0 ? <div className='error-message'><p>- {errorMessage}</p></div> : ''}
      <div className="input-box">
        <input type="text" placeholder='Collection name:' value={collectionName} onChange={e => setCollectionName(e.target.value)}/>
      </div>
      
      {paintings.length !== 0 ? 
        paintings.map((painting, index) => 
          <div className="input-box" key={index}>
            <h4>add painting {index +1}</h4>
            <div className="input-box">
              <input type="text" placeholder='Name:' value={painting.name} onChange={e => setPaintingValues('name', index, e.target.value)}/>
              <input type="file" onChange={e => setImageString(index, e.target.files)}/>
              
            </div>
            <div className="input-box">
              <input type="text" placeholder='Dimensions:' value={painting.dimensions} onChange={e => setPaintingValues('dimensions', index, e.target.value)}/>
              <select name="Medium" value={painting.medium} onChange={e => setPaintingValues('medium', index, e.target.value)} >
                <option value=""></option>
                <option value="Water color">Water color</option>
                <option value="Acrylics">Acrylics</option>
                <option value="Oil Paint">Oil Paint</option>
                <option value="Mixed media">Mixed media</option>
              </select>
            </div>
            <div className="input-box">
              <input type="text" placeholder='Price' value={painting.price} onChange={e => setPaintingValues('price', index, e.target.value)}/>
              <input type="text" placeholder='Description' value={painting.description} onChange={e => setPaintingValues('description', index, e.target.value)}/>
            </div>

            {painting.image_string.length !== 0 ? <img className='image-preview' src={painting.image_string}/> : '' }
                    
          </div>
          
        ) : ''
      }
      <button className="button" onClick={e => addPaintingToPaintings()}>Add painting</button>
      <button className="button" onClick={e => sendData()}>Save collection and paintings</button>
      
    </div>
  )
}

export default NewCollection;