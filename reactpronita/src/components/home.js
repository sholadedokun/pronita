// the container Component for all the Restaurant
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadMore} from '../actions';
import Restaurant from './offer.js';
import {Grid, Row, Col} from 'react-bootstrap';
import Button from './button';
import _ from 'lodash';
import {Pluralise} from './commonFilters';
class Home extends (Component){
    // loadMore(allOffers, pagination){
    //     this.props.loadMore(allOffers, pagination)
    // }
    render(){

        let allOffers = <div>Loading</div>
        //if we have Geocode and we've not yet fetch a restaurant
        // if(this.props.position && newOffers.length===0 ){
        //
        // }
        //howerver, if we already have some Offers and there are no errors
        // if(newOffers && error ==='' ){
        //     //let map over the object to create some individual restuarant components ... Lodash help with 'object' mapping
        //     allOffers= _.map(newOffers, (item)=>{
        //
        //         return (
        //             //we load the the restaurant with components uniqueId(thanks Lodash!!!)
        //             // then we spread all the restaurant Properties as props to the RESTAUTANT Component
        //             <Restaurant key={_.uniqueId()} {...item} />
        //         )
        //     });
        // }
        //but incase we have error!!!
        // else if(error !== ''){
        //     allOffers=<div>{error}</div>
        // }
        //since commenting inside JSX is kindaa!!!  {/**/} doesn't seems convinient
        //first 'Row' tag help to display the right amount of Offers return and I use a dump component to give it the right grammer...
        //second 'ROW' tag loads the Offers and determines to show the 'Load More' Button or not...
        return(
            <Grid>

                <Row className="restaurantHead ">
                    <Col className="nop" xs={8}>{allOffers.length} <Pluralise count={allOffers.length} singular='Inventory' plura='Inventories'/> Found</Col>
                    <Col className="nop" xs={4}>Pronita Space</Col>
                </Row>
                {/*<Row componentClass="ul">
                    {allOffers}
                    {
                        pagination && pagination.hasNextPage ?

                        <Col xs={10} mdOffset={4} md={4}><Button value="Load More" type="primary" icon='plus' onClick={this.loadMore.bind(this, allOffers, pagination)} /></Col> : ''
                    }
                </Row>*/}
            </Grid>
        )
    }
}

export default Home
