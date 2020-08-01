import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {GetCollectionAction} from '../../actions/CollectionsAction';
import {GetCollectionPaintingsAction} from '../../actions/PaintingsAction';
import {FileBase64} from 'react-file-base64';

const UpdateCollection = ({match}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.CurrentUserReducer);
  const collection = useSelector(state => state.CollectionsReducer);
  const [newCollectionData, setNewCollectionData] = useState();
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    // match keyword gives you acces to react routers params
    const collectionId = match.params.collectionId;
    if(collection._id !== collectionId){
      dispatch(GetCollectionAction(currentUser, collectionId));
      dispatch(GetCollectionPaintingsAction(collectionId));
    }

  },[currentUser])

  // const setCollectionName = (value) => {
  //   const col = {...collection};
  //   col.name = value;
  //   setCollection(col);
  // }

  // const addPictureToPictures = () => {
  //   const currentPictures = [...pictures]
  //   currentPictures.push({name: '', image_string: '', dimensions: '', medium: '', price: '', description: ''})
  //   setPictures(currentPictures)
  // } 
  
  // const setPictureValues = (key, index, value) => {
  //   const pics = [...pictures];
  //   pics[index][key] = value;
  //   setPictures(pics)
  // }

  return(
    <div className='container'>
      <h1>UpdateCollection </h1>
      <div className="input-box">
        {/* <input type="text" placeholder='Collection name:' value={collection.name} onChange={e => setCollectionName(e.target.value)}/> */}
      </div>
      
      {/* {pictures.length !== 0 ? 
        pictures.map((picture, index) => 
          <div className="input-box" key={index}>
            <h4>add painting {index +1}</h4>
            <div className="input-box">
              <input type="text" placeholder='Name:' value={picture.name} onChange={e => setPictureValues('name', index, e.target.value)}/> */}
              {/* <FileBase64 multiple={false} onDone={setImageString.bind(this, index) }/> */}
              
            {/* </div>
            <div className="input-box">
              <input type="text" placeholder='Dimensions:' value={picture.dimensions} onChange={e => setPictureValues('dimensions', index, e.target.value)}/>
              <select name="Medium" value={picture.medium} onChange={e => setPictureValues('medium', index, e.target.value)} >
                <option value="Water color">Water color</option>
                <option value="Acrylics">Acrylics</option>
                <option value="Oil Paint">Oil Paint</option>
                <option value="Mixed media">Mixed media</option>
              </select>
            </div>
            <div className="input-box">
              <input type="text" placeholder='Price' value={picture.price} onChange={e => setPictureValues('price', index, e.target.value)}/>
              <input type="text" placeholder='Description' value={picture.description} onChange={e => setPictureValues('description', index, e.target.value)}/>
            </div>
                    
          </div>
        ) : '' 
      }*/}
      {/* <button className="button" onClick={e => addPictureToPictures()}>Add painting</button> */}
      {/* <button className="button" onClick={e => sendData()}>Save collection and paintings</button> */}
      
    </div>
  )
}

export default UpdateCollection;