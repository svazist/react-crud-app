
import * as TYPES from "@front/redux/entities/constats";

const initialState = {
    entities:[],
    page:1,
    limit:10,
    total:0
}

export default function entities(state = initialState, action) {
    switch (action.type){

        case TYPES.ENTITIES.LOADED:
            return {...state,
                entities:action.entities,
                total:action.total,
                page:action.page,
                limit:action.limit
            };

        case TYPES.ENTITIES.SET_PAGE:
            return {...state,
                page:action.page,
            };

        case TYPES.ENTITIES.UPDATE_ROW:
            entities = entities.map(item=>(item.id === action.itemId)?action.data:item);
            return {...state,
                entities:entities,
            };

        case TYPES.ENTITIES.SET_PAGE_SIZE:
            return {...state,
                limit:action.limit,
            };


        default:
            return state
    }
}