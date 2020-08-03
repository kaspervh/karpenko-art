import {combineReducers} from 'redux';
import ModalReducer from './ModalReducer';
import CurrentUserReducer from './CurrentUserReducer';
import CollectionsReducer from './CollectionsReducer';
import PaintingsReducer from './PaintingsReducer';
import AllCollectionsReducer from './AllCollectionsReducer'

const allReducers = combineReducers({   
    ModalReducer,
    CurrentUserReducer,
    CollectionsReducer,
    PaintingsReducer,
    AllCollectionsReducer,

});

export default allReducers;

