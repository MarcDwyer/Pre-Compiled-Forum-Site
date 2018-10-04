import {USER} from '../actions/index';

export default function(state = null, action) {
    switch (action.type) {
        case USER:
        const user = action.payload.data === undefined ? null : action.payload.data;
        return user
    }
    return state;
}