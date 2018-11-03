import {USER} from '../actions/index';

export default function(state = null, action) {
    switch (action.type) {
        case USER:
        const user = action.payload === undefined ? null : action.payload;
        return user
    }
    return state;
}
