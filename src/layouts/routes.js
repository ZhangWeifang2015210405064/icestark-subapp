import React from 'react';
import {
	HashRouter as Router,
	Route,
	Switch,
	Redirect
} from 'react-router-dom';
import Home from '@/pages/Home/index';

const Routes = () => (
	<Router>
		<Switch>
			<Route path="/home" component={Home} />
			<Redirect from="*" to="/home" />
		</Switch>
	</Router>
);

export default Routes;
