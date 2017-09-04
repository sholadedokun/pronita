import React, {Component} from 'react'
import {BrowserRouter as Router,  Route } from 'react-router-dom';

import Header from './header';
import Home from './home';
import Signin from './auth/signin';
import Signup from './auth/signup';
import Invenotry from './inventory';
import Account from './userAccount';
import Pricing from './pricing';
import Help from './help';
import requireAuth from './auth/require_auth';

import {Grid, Row} from 'react-bootstrap';

//We can now
//wrap redux store with our application through the Provider Tag
//enable route for our application through the Router Tag
//bootstrap, 'Grid' get resolve to container
//attaching our app to the html dom through document.getElementById('root'))
export default class App extends Component{
    render(){
        return(
            <Router>
                <Grid fluid={true} className="App nop">
                    <Row>
                        <Header title="Pronita" />
                        <Route  exact path="/"  component={Home} />
                        <Route  exact path="/signin"  component={Signin} />
                        <Route  exact path="/signup"  component={Signup} />
                        <Route  exact path="/inventory"  component={Invenotry} />
                        <Route  path="/userAccount"  component={requireAuth(Account)} />
                        <Route  exact path="/pricing"  component={Pricing} />
                        <Route  exact path="/help"  component={Help} />
                    </Row>
                </Grid>
            </Router>
        )

    }
}
