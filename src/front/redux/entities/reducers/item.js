import * as TYPES from "@front/redux/entities/constats";

const initialState = {
    data: {},
    loading: false,
    loaded: false,
    error: false,
    id: null,
    saving: false,
    saved: false,
    deleting: false,
    deleted: false,
    adding: false,
    added: false,
};

export default function activeItem(state = initialState, action) {
    switch (action.type) {

        case TYPES.LOAD.PROCESS:
            return {...state, loading: true, loaded: false, saving: false, saved: false};

        case TYPES.LOAD.SUCCESS:
            return {...initialState, loaded: true, data: action.data};

        case TYPES.LOAD.ERROR:
            return {...state, loading: false, loaded: false, error: action.error, saving: false, saved: false};

        case TYPES.UPDATE.PROCESS:
            return {...state, saving: true, saved: false};

        case TYPES.UPDATE.SUCCESS:
            return {...state, saving: false, saved: true};

        case TYPES.UPDATE.ERROR:
            return {...state, saving: false, saved: false, error: action.error};

        case TYPES.ADD.CLEAN:
        case TYPES.UPDATE.CLEAN:
        case TYPES.DELETE.CLEAN:
            return initialState;

        case TYPES.DELETE.PROCESS:
            return {...state, deleting: true, deleted: false};

        case TYPES.DELETE.SUCCESS:
            return {...state, deleting: false, deleted: true};

        case TYPES.DELETE.ERROR:
            return {...state, deleting: false, deleted: false, error: action.error};

        case TYPES.ADD.PROCESS:
            return {...state, adding: true, added: false};

        case TYPES.ADD.SUCCESS:
            return {...state, adding: false, added: true, data: action.data};

        case TYPES.ADD.ERROR:
            return {...state, adding: false, added: false, error: action.error};

        default:
            return state
    }
}