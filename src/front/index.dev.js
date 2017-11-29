import React from 'react';
import ReactDOM from 'react-dom';
import ApplicationRoot from '@front/app.dev';

import { AppContainer } from 'react-hot-loader';

if (!Date.now_timestamp) {
    Date.now_timestamp = function() { return Math.floor((new Date()).getTime()/1000); }
}

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('App')
    )
};

render(ApplicationRoot);

if (module.hot) {
    module.hot.accept("@front/app.dev", (() => { render(ApplicationRoot) }));
}