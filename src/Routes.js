import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './History';
import Home from './Component/Home';
import Film from './Component/Film';
import Actor from './Component/Actor';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
        auth.handleAuthentication();
    }
}

class Routes extends Component {
    render() {
        return (
            <Router history={history} component={App}>
                <div>
                    <Route path="/" render={props => <App auth={auth}{...props} />} />
                    <Route path="/callback" render={props => {
                        handleAuthentication(props);
                        return <Callback {...props} />
                    }} />
                    <Route path="/home" render={props => <Home auth={auth}{...props} />} />
                    <Route path="/film" render={props => <Film auth={auth}{...props} />} />
                    <Route path="/actor" render={props => <Actor auth={auth}{...props} />} />
                </div>
            </Router>
        )
    }
}

export default Routes;