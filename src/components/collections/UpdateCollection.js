import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {GetCollectionAction} from '../../actions/CollectionsAction';
import {GetCollectionPaintingsAction} from '../../actions/PaintingsAction';
import {FileBase64} from 'react-file-base64';
import { useLayoutEffect } from 'react';

const UpdateCollection = ({match}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.CurrentUserReducer);
  const collection = useSelector(state => state.CollectionsReducer);
  const paintings = useSelector(state => state.PaintingsReducer);
  const [updatableCollectionName, setUpdatableCollectionName] = useState('');
  const [updatablePaintings, setUpdatablePaintings] = useState([]);
  
  useEffect(() => {
    const collectionId = match.params.collectionId;
    dispatch(GetCollectionAction(currentUser, collectionId));
    dispatch(GetCollectionPaintingsAction(collectionId));
  },[])

  useLayoutEffect(() => {
    if(!updatableCollectionName){setUpdatableCollectionName(collection.name)}
    if(updatablePaintings.length === 0){setUpdatablePaintings(paintings)}
  },[collection, paintings])

  const addPaintingToPaintings = () => {
    const currentPaintings = [...updatablePaintings]
    currentPaintings.push({name: '', image_string: '', dimensions: '', medium: '', price: '', description: ''})
    setUpdatablePaintings(currentPaintings)
  } 

  const setPaintingValues = (key, index, value) =>{
    let pics = [...paintings];
    pics[index][key] = value
    setUpdatablePaintings(pics);
  }

  // i have no idea why the index and files change places, as far as i can see it not an async error...
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

  const sendData = () => {

  }

  return(
    <div className='container'>
      <input type="text" value={updatableCollectionName}/>
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