import { COMPILE, GET_ERRORS} from './types';
import axios from "axios";



export const compile = (info) => dispatch => {
    console.log("compile called");
    axios.post('/compile',info) 
     .then(res => {
        dispatch({
           type: COMPILE,
           payload: res.data
        });
     })
     .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.data
      })
     });
}


export const error = () => {
    return {
        type: GET_ERRORS,
     };
}
