
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import entities from './entities/reducers/entities'
import activeItem from './entities/reducers/item'
import metadata from './entities/reducers/metadata'

export default combineReducers({
    entities,
    activeItem,
    metadata,
    routing:routerReducer
})