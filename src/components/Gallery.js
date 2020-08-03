import React, {useState, useEffect} from 'react';
import {ShowModalAction} from '../actions/ModalAction';
import {useDispatch, useSelector} from 'react-redux';
import {GetCollectionsAction} from '../actions/CollectionsAction';
import {GetCollectionPaintingsAction} from '../actions/PaintingsAction';
import LoadingScreen from './shared/LoadingScreen'



const Gallery = () => {
  const collections = useSelector(state => state.AllCollectionsReducer);
  const paintings = useSelector(state => state.PaintingsReducer);
  const [loading, setLoading] = useState(true);
  const [headline] = useState('Memories of nobody')
  const dispatch = useDispatch()

  useEffect(() => {
    if(collections.length === 0 && typeof collections !== 'array'){
      dispatch(GetCollectionsAction());
    }
  },[])

  useEffect(() => {
    if(collections.length !== 0){dispatch(GetCollectionPaintingsAction(collections[collections.length -1]._id));}
    
  },[collections])

  useEffect(() => {
    
    if(paintings.length !== 0 ){setLoading(false)}
  },[paintings])

  const showModal = () =>{
    dispatch(ShowModalAction())
  }
  
  return(
    <div>
      <div className="galery-header">
        <h1>{headline}</h1>
      </div>

      <div className="gallery-box">
        {loading === true ?
          <LoadingScreen/> :  
          paintings.map((painting, index) => 
            <div className="picture-box" key={index}>
              <img src={painting.image_string} className="picture" onClick={e => showModal()}/>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Gallery