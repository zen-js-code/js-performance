import React from 'react';
import {Switch, Route} from 'react-router-dom';

import App from '../modules/app/';
import Dashboard from '../modules/dashboard/';
import Edit from '../modules/edit/';
import Help from '../modules/help/';
import Settings from '../modules/settings/';

export default function AppContainer() {
    return (
        <App>
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/edit" component={Edit} />
                <Route exact path="/help" component={Help} />
                <Route exact path="/settings" component={Settings} />
            </Switch>
        </App>
    );
}
