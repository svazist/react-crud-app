import * as TYPES from '../constats/index'

const initialState = {
    entities:[],

};

export default function metadata(state = initialState, action) {
    switch (action.type){

        case TYPES.METADATA.LOADED:
            return {...state, entities:action.meta};

        default:
            return state
    }
}