import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {ShowModalAction} from '../actions/ModalAction';



const Gallery = () => {
  const [images] = useState(['http://3.bp.blogspot.com/-hIZdzZipHGQ/T_xf8BYswyI/AAAAAAAAA1o/trv7LbmwZw4/s1600/cat+17.jpg',
                                        'https://i.ytimg.com/vi/Y_aIRFhCg7A/hqdefault.jpg',
                                        'http://2.bp.blogspot.com/-c0EOLg_ts-8/URXa91dZF8I/AAAAAAAADVY/0M3htcWhQds/s1600/kitten+3.jpg',
                                        'https://www.thehappycatsite.com/wp-content/uploads/2017/11/kitten-tabby.jpg',
                                        'https://i.ytimg.com/vi/Vl3wGTu1cy8/maxresdefault.jpg',
                                        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.wagwalkingweb.com%2Fmedia%2Farticles%2Fcat%2Fwhy-is-my-cat-sneezing%2Fwhy-is-my-cat-sneezing.jpg&f=1&nofb=1'])
  
  const [headline] = useState('Memories of nobody')
  const dispatch = useDispatch()

  const showModal = () =>{
    dispatch(ShowModalAction())
  }
  
  return(
    <div>
      <div className="galery-header">
        <h1>{headline}</h1>
      </div>

      <div className="gallery-box">
        {images.map(image => 
          <div className="picture-box">
            <img src={image} key={image} className="picture" onClick={e => showModal()}/>
          </div>
          
        )}
      </div>
    </div>
  )
}

export default Gallery