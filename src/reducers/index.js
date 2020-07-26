import {combineReducers} from 'redux';
import ModalReducer from './ModalReducer';
import CurrentUserReducer from './CurrentUserReducer';

const allReducers = combineReducers({   
    ModalReducer,
    CurrentUserReducer,
});

export default allReducers;

