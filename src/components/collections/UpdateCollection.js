import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {GetCollectionAction, UpdateCollectionAction} from '../../actions/CollectionsAction';
import {GetCollectionPaintingsAction, UpdatePaintingsAction} from '../../actions/PaintingsAction';
import {FileBase64} from 'react-file-base64';
import { useLayoutEffect } from 'react';

const UpdateCollection = ({match}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.CurrentUserReducer);
  const collection = useSelector(state => state.CollectionsReducer);
  const paintings = useSelector(state => state.PaintingsReducer);
  const [updatableCollectionName, setUpdatableCollectionName] = useState('');
  const [updatablePaintings, setUpdatablePaintings] = useState([]);
  const [errorMessage, setErrorMessage] = useState([])
  
  // will trigger when component is loaded and run once
  useEffect(() => {
    const collectionId = match.params.collectionId;
    dispatch(GetCollectionAction(currentUser, collectionId));
    dispatch(GetCollectionPaintingsAction(collectionId));
  },[])

  // will trigger when collections or paintings has loaded from reeducer and
  // and push reducers data to local states
  useLayoutEffect(() => {
    if(!updatableCollectionName){setUpdatableCollectionName(collection.name)}
    if(updatablePaintings.length === 0){setUpdatablePaintings(paintings)}
  },[collection, paintings])

  // will add another painting to the satate and in turn create another form for the painting
  const addPaintingToPaintings = () => {
    const currentPaintings = [...updatablePaintings]
    currentPaintings.push({name: '', image_string: '', dimensions: '', medium: '', price: '', description: ''})
    setUpdatablePaintings(currentPaintings)
  } 

  // updates the values in the paintings array
  const setPaintingValues = (key, index, value) =>{
    let pics = [...paintings];
    pics[index][key] = value
    setUpdatablePaintings(pics);
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

  // will check if the text fields are filled in
  const verifyFields = () => {
    if(updatableCollectionName.length === 0){return false}
    if(updatablePaintings.length !== 0){
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

  // code will check if all fields are filled in
  // if so the code will update the collection
  //otherwise the coe will trigger an error message
  const sendData = () => {
    if(verifyFields() === false ){
      setErrorMessage('Some of the form field are not filled in');
    }else{
      dispatch(UpdateCollectionAction(collection._id, updatableCollectionName, currentUser));
      console.log('updatable paintings', updatablePaintings);
      let PaintingsToUpdate = [];
      let paintingsToCreate = [];
      const paintingsIds = paintings.map(painting => painting._id)
      for(let painting of updatablePaintings){
        if(paintingsIds.includes(painting._id)){
          PaintingsToUpdate.push(painting)
        }else{
          paintingsToCreate.push(painting)
        }
      }
      
    }
  }

  return(
    <div className='container'>
      <h1>Update Collection</h1>
      {errorMessage.length !== 0 ? <div className='error-message'><p>- {errorMessage}</p></div> : ''}
      <input type="text" value={updatableCollectionName} onChange={e => setUpdatableCollectionName(e.target.value)}/>
      {updatablePaintings.length !== 0 ? 
        updatablePaintings.map((painting, index) => 
          <div className="input-box" key={index}>
            <h4>add painting {index +1}</h4>
            <div className="input-box">
              <input type="text" placeholder='Name:' value={painting.name} onChange={e => setPaintingValues('description', index, e.target.value)}/>
              <input type="file" onChange={e => setImageString(index, e.target.files)}/>
              
            </div>
            <div className="input-box">
              <input type="text" placeholder='Dimensions:' value={painting.dimensions} onChange={e => setPaintingValues('description', index, e.target.value)} />
              <select name="Medium" value={painting.medium}  onChange={e => setPaintingValues('description', index, e.target.value)}>
                <option value=""></option>
                <option value="Water color">Water color</option>
                <option value="Acrylics">Acrylics</option>
                <option value="Oil Paint">Oil Paint</option>
                <option value="Mixed media">Mixed media</option>
              </select>
            </div>
            <div className="input-box">
              <input type="text" placeholder='Price' value={painting.price} onChange={e => setPaintingValues('description', index, e.target.value)} />
              <input type="text" placeholder='Description' value={painting.description} onChange={e => setPaintingValues('description', index, e.target.value)} />
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

export default UpdateCollection;