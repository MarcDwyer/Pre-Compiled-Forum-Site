import {GET_POSTS, POST_POST, GET_POST, POST_COMMENT, DELETE_POST} from '../actions/index';
import update from 'immutability-helper';
import _ from 'lodash';


export default function(state = {}, action) {
    switch (action.type) {
        case GET_POSTS:
        return _.mapKeys(action.payload.data, '_id');
    }
    switch(action.type) {
        case POST_POST:
        return {...state, ...action.payload}
    }

    switch(action.type) {
        case GET_POST:
        return {...state, [action.payload.data._id]: action.payload.data };
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
    return state
}
