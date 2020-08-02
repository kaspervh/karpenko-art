import {combineReducers} from 'redux';
import ModalReducer from './ModalReducer';
import CurrentUserReducer from './CurrentUserReducer';
import CollectionsReducer from './CollectionsReducer';
import PaintingsReducer from './PaintingsReducer';

const allReducers = combineReducers({   
    ModalReducer,
    CurrentUserReducer,
    CollectionsReducer,
    PaintingsReducer,

});

export default allReducers;

