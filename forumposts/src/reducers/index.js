import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import Posts from '../reducers/reducer_getposts';
import Login from './reducer_login';


const rootReducer = combineReducers({
    posts: Posts,
    form: formReducer,
    user: Login
})

export default rootReducer;