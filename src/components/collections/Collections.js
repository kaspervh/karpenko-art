import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import {GetCollectionsAction} from '../../actions/CollectionsAction';
import {Link} from 'react-router-dom';

const Collections = () => {
  const dispatch = useDispatch();
  const collections = useSelector(state => state.AllCollectionsReducer);

  useEffect(() => {
    dispatch(GetCollectionsAction())
  }, [])


  return(
    <div className='container'>
      <h1>Collections</h1>
      
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>update</th>
            <th>delete collection</th>
          </tr>
        </thead>
        <tbody>
          {collections.length !== 0 ? 
          collections.map(collection => 
            <tr key={collection.name}>
              <td>{collection.name}</td>
              <td><Link to={`collections/${collection._id}/update`} className="button">Update collection</Link></td>
              <td><button className="button">Delete collection</button></td>
            </tr>
          ): ''
          }
        </tbody>
      </table>
      
      <Link to='/collections/new' className="button">New collection</Link>
      
    </div>
  )
}

export default Collections;