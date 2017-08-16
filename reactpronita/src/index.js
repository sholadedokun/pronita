
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,  Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import {AUTH_USER} from './actions/actionTypes'
import './styles/index.css';
import './styles/App.css';


import Header from './components/header';
import Home from './components/home';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Invenotry from './components/inventory';
import Account from './components/userAccount';
import Pricing from './components/pricing';
import Help from './components/help';
import requireAuth from './components/auth/require_auth';
import reducers from './reducers';

import {Grid, Row} from 'react-bootstrap';
import registerServiceWorker from './registerServiceWorker';

//applying reduxThunk as middleware enabled us to use dispatch from actions
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('PronitaToken');
// If we have a token, consider the user to be signed in
if (token) {
  // we need to update application state
  store.dispatch({ type: AUTH_USER });
}

//We can now
//wrap redux store with our application through the Provider Tag
//enable route for our application through the Router Tag
//bootstrap, 'Grid' get resolve to container
//attaching our app to the html dom through document.getElementById('root'))
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Grid fluid={true} className="App nop">
                <Row>
                    <Header />
                    <Route  exact path="/"  component={Home} />
                    <Route  exact path="/signin"  component={Signin} />
                    <Route  exact path="/signup"  component={Signup} />
                    <Route  exact path="/inventory"  component={Invenotry} />
                    <Route  exact path="/userAccount"  component={requireAuth(Account)} />
                    <Route  exact path="/pricing"  component={Pricing} />
                    <Route  exact path="/help"  component={Help} />
                </Row>
            </Grid>
        </Router>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
