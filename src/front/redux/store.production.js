import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '@redux/reducers'
import thunk from 'redux-thunk'
import stateMiddleware from '@redux/middleware/getState'



const enhancer = compose(
    applyMiddleware(stateMiddleware()),
    applyMiddleware(thunk)
);

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        enhancer);
    return store
}