import React, {Component} from 'react';
import { getLongLat, reverseGeocoding, switcher} from '../actions';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import {Grid, Nav} from 'react-bootstrap';

class Header extends(Component){
    constructor(props){
        super();
    }
    componentWillMount(){

    }
    componentWillReceiveProps(nextProps){

    }

    renderLinks() {
      if (this.props.authenticated) {
        // show a link to sign out
        return [<li className="nav-item">
          <Link className="nav-link" to="/signout">Sign Out</Link>
        </li>,
        <li><Link to="/account/">Account</Link></li>]
      } else {
        // show a link to sign in or sign up
        return [
          <li className="nav-item" key={1}>
            <Link className="nav-link" to="/signin">Sign In</Link>
          </li>,
          <li className="nav-item" key={2}>
            <Link className="nav-link" to="/signup">Sign Up</Link>
          </li>
        ];
      }
    }

    render(){
        const { allRestaurants } = this.props
        return(
            <Grid className="App-header">
                <div className="companyName">Pronita</div>
                <Nav>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/inventory">inventory</Link></li>
                        <li><Link to="/pricing">Pricing</Link></li>
                        <li><Link to="/help">Help</Link></li>
                        {this.renderLinks()}
                </Nav>
            </Grid>
        )
    }
}
//to connet to our this component's prop to our state
function mapStateToProps(state){
    return{
        authenticate:state.user.authenticate
    }
}
const mapDispatchToProps = {getLongLat, reverseGeocoding, switcher}
//wrapping our connect with the component
export default connect(mapStateToProps, mapDispatchToProps)(Header)
