import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchDetails} from '../actions';
import Rating from './rating';
import Button from './button';
import Image from './image'
import {Col} from 'react-bootstrap';
import {TextLimiter} from './commonFilters';
class Offers extends(Component){
    render(){
        //processing all the props received from the product-container component
        const {name, rate, type, profilePic, category,  subCategory} = this.props

        return(
            <Col md={3} sm={6} xs={12} componentClass="li" className="storyContainer">
                <div className="restaurantContainer">
                    <div name='imageContainer' className="imageContainer">
                        <Image width='300px' height='250px' type='productImage'  url={profilePic} />
                    </div>
                    <div className="restaurantDetails">
                        <div>
                            <span className="name">
                                <TextLimiter value={name} limit={25}/>
                            </span>
                        </div>
                        <div>
                            <span>{type}</span>

                        </div>
                    </div>
                    <div className="buttonContainer">
                        <Button value="View Details" type="primary" icon='star-o' link=""/>
                    </div>
                </div>
            </Col>
        )
    }

}

export default connect(null, {fetchDetails})(Offers);
