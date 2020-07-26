import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {CurrentUserAction} from '../actions/CurrentUserAction';
import {useHistory} from 'react-router-dom'


const Login = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const currentUser = useSelector(state => state.CurrentUserReducer);

  useEffect(() => {
    if(currentUser.message === 'Password is invalid'){setErrorMessage(currentUser.message)}
    if(currentUser.message === 'user not found'){setErrorMessage(currentUser.message)}
    if(currentUser.message === 'user is logged in'){history.push('/')}
  },[currentUser])

  const submitForm = () =>{ 
    dispatch(CurrentUserAction(username, password))
  }

  return(
    <div className="form-container-vertical">
      {console.log(errorMessage)}
      {errorMessage.length !== 0 ? <div className='error-message'><p>- {errorMessage}</p></div> : ''}
      
      <h1>Login to karpenko art</h1>
      
      <div className="input-box">
        <label>Username:</label>
        <br/>
        <input type="text" value={username} onChange={e => setUserName(e.target.value)}/>
      </div>
      
      <div className="input-box">
        <label>password:</label>
        <br/>
        <input type="text" value={password} onChange={e => setPassword(e.target.value)}/>
      </div>

      <button className="button" onClick={submitForm}>Log in</button>
    
    </div>
  )
}

export default Login;