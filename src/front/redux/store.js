import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '@redux/reducers'
import thunk from 'redux-thunk'
import {DevTools} from '@front/components/DevTools';
import stateMiddleware from '@redux/middleware/getState'



const enhancer = compose(
    applyMiddleware(stateMiddleware()),
    applyMiddleware(thunk),
    DevTools.instrument(),
);

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        enhancer);
        if (module.hot) {
            module.hot.accept('@redux/reducers', () => {
                const nextRootReducer = require('@redux/reducers');
                store.replaceReducer(nextRootReducer);
            });
        }
    return store
}