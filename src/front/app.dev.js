import 'babel-polyfill'

import React from 'react'

import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import { createHashHistory } from 'history'
import { syncHistoryWithStore } from 'react-router-redux'

import configureStore from '@redux/store.dev'


import {DevTools} from './components/DevTools'

import * as Entities from "@front/components/entities";
import EntitiesContainer from "@front/ui/entities/Container";
import * as AppComponents from "@front/components";

let ApplicationStore = configureStore();

const browserHistory = createHashHistory();
syncHistoryWithStore(browserHistory, ApplicationStore);

const ApplicationRoot = () => (
    <Provider store={ApplicationStore}>
        <div>
            <Router>
                <AppComponents.App>
                    <Switch>
                        <Route path="/about" component={AppComponents.About}/>
                        <Route path="/:entity/">
                            <EntitiesContainer>
                                <Switch>
                                    <Route path="/:entity/add" component={Entities.Add}/>
                                    <Route path="/:entity/:id">
                                        <Switch>
                                            <Route path="/:entity/:id/view" component={Entities.View}/>
                                            <Route path="/:entity/:id/edit" component={Entities.Edit}/>
                                            <Route path="/:entity/:id/del" component={Entities.Delete}/>
                                            <Route path="/:entity/:id" component={Entities.View}/>
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
