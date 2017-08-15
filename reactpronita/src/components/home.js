// the container Component for all the Restaurant
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchRestaurants, loadMore} from '../actions';
import Restaurant from './restaurant.js';
import {Grid, Row, Col} from 'react-bootstrap';
import Button from './button';
import _ from 'lodash';
import {Pluralise} from './commonFilters';
class Home extends (Component){
    loadMore(allRestaurants, pagination){
        this.props.loadMore(allRestaurants, pagination)
    }
    render(){
        //we extracting all the stuffs we care for from allRestaurants props
        const { fetched, newRestaurants, error, pagination } = this.props.allRestaurants;
        //set default page to show loading since we will might making an asynchronus call
        let allRestaurants = <div>Loading</div>
        //if we have Geocode and we've not yet fetch a restaurant
        if(this.props.position && newRestaurants.length===0 ){
            //then we should go some restaurants with our position
            this.props.fetchRestaurants(this.props.position)
        }
        //howerver, if we already have some restaurants and there are no errors
        if(newRestaurants && error ==='' ){
            //let map over the object to create some individual restuarant components ... Lodash help with 'object' mapping
            allRestaurants= _.map(newRestaurants, (item)=>{

                return (
                    //we load the the restaurant with components uniqueId(thanks Lodash!!!)
                    // then we spread all the restaurant Properties as props to the RESTAUTANT Component
                    <Restaurant key={_.uniqueId()} {...item} />
                )
            });
        }
        //but incase we have error!!!
        else if(error !== ''){
            allRestaurants=<div>{error}</div>
        }
        //since commenting inside JSX is kindaa!!!  {/**/} doesn't seems convinient
        //first 'Row' tag help to display the right amount of Restaurants return and I use a dump component to give it the right grammer...
        //second 'ROW' tag loads the Restaurants and determines to show the 'Load More' Button or not...
        return(
            <Grid>

                <Row className="restaurantHead ">
                    <Col className="nop" xs={8}>{allRestaurants.length} <Pluralise count={allRestaurants.length} singular='Inventory' plura='Inventories'/> Found</Col>
                    <Col className="nop" xs={4}>Pronita Space</Col>
                </Row>
                <Row componentClass="ul">
                    {allRestaurants}
                    {
                        pagination && pagination.hasNextPage ?

                        <Col xs={10} mdOffset={4} md={4}><Button value="Load More" type="primary" icon='plus' action={this.loadMore.bind(this, allRestaurants, pagination)} /></Col> : ''
                    }
                </Row>
            </Grid>
        )
    }
}
function mapPropsToState(state){
    return{
            allRestaurants: state.allRestaurants,
            position : state.allRestaurants.position
        }

}
export default connect(mapPropsToState, {fetchRestaurants, loadMore})(Home)
