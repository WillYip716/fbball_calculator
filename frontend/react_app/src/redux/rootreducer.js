import { combineReducers } from 'redux';
import reducer from './compilereducer';

export default combineReducers({
    comp: reducer
})