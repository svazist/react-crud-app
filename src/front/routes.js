import React from 'react'
import { IndexRoute, Route, Link, IndexRedirect, Redirect } from 'react-router'

import * as Entities from '@front/components/entities'
import * as AppComponents from '@front/components'

const routes = (
    <Route path='/' component={AppComponents.App}>
        <Route exact path="app" component={AppComponents.Home}/>
        <Route exact path=":entity" component={Entities.List}/>
        <Route exact path=":entity/add" component={Entities.Add}/>
        <Route exact path=":entity/:id/view" component={Entities.View}/>
        <Route exact path=":entity/:id/edit" component={Entities.Edit}/>
    </Route>
)

export default routes
