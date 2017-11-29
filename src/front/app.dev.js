import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import { createHashHistory } from 'history'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import {DevTools} from './components/DevTools'
import routes from './routes'
import * as reducers from '@redux/entities/reducers'
import * as Entities from "@front/components/entities";
import EntitiesContainer from "@front/ui/entities/Container";
import * as AppComponents from "@front/components";

const browserHistory = createHashHistory();

const reducer = combineReducers({
    // ...reducers,
    routing: routerReducer
})


const store = createStore(
    reducer,
    DevTools.instrument()
);

const history = syncHistoryWithStore(browserHistory, store);

const ApplicationRoot = () => (
    <Provider store={store}>
        <div>
            <Router>
                <AppComponents.App>
                    <Switch>
                        <Route path="/:entity/">
                            <EntitiesContainer>
                                <Switch>
                                    <Route  path="/:entity/add" component={Entities.Add}/>
                                    <Route  path="/:entity/:id">
                                        <Switch>
                                            <Route   path="/:entity/:id/view" component={Entities.View}/>
                                            <Route   path="/:entity/:id/edit" component={Entities.Edit}/>
                                            <Route   path="/:entity/:id" component={Entities.View}/>
                                        </Switch>
                                    </Route>

                                    <Route component={Entities.List}/>
                                </Switch>
                            </EntitiesContainer>
                        </Route>
                        <Route path="/" component={AppComponents.Home}/>
                    </Switch>
                </AppComponents.App>
            </Router>
            <DevTools />
        </div>
    </Provider>
);
export default ApplicationRoot
