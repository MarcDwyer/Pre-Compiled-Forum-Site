import {GET_POSTS, POST_POST, GET_POST, POST_COMMENT, DELETE_POST, USER_POSTS} from '../actions/index';
import update from 'immutability-helper';
import _ from 'lodash';


export default function(state = null, action) {
    switch (action.type) {
        case GET_POSTS:
        return _.mapKeys(action.payload.data, '_id');
    }
    switch(action.type) {
        case POST_POST:
        return {...state, [action.payload._id]: action.payload}
    }

    switch(action.type) {
        case GET_POST:
        return {...state, [action.payload._id]: action.payload};
    }
    switch(action.type) {
        case POST_COMMENT:
        return update(state, {
            [action.payload._id]: {
                comments: {$push: [action.payload]}
            }
        })
    }
    switch(action.type) {
        case DELETE_POST:
        return _.omit(state, action.payload);
    }
    switch(action.type) {
        case USER_POSTS:
        return _.mapKeys(action.payload, '_id');
    }
    return state;
}
