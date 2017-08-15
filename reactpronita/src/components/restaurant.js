import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchDetails} from '../actions';
import Rating from './rating';
import Button from './button';
import Image from './image'
import {Col} from 'react-bootstrap';
import {TextLimiter} from './commonFilters';
class Restaurant extends(Component){
    render(){
        //processing all the props received from the home-container component
        const {name, rating, review, vicinity, place_id,  icon, opening_hours, photos, types} = this.props
        //need to determine if the restaurant is currently opened,
        const opened = opening_hours? (opening_hours.open_now ? 'Yes': 'No') :'Not Available'
        //using the slice method to get just the first two category, seperating them with '|' instead of ',' and turning the first letter to uppercase
        const RestaurantType= types.splice(0, 2).toString().replace(',', ' | ').replace(/(?:^|\s)\S/g, l => l.toUpperCase());
        //assigning the first picture as the profile picture, but use the Icon if there is no picture
        const profileImage= photos ? photos[0].getUrl({'maxWidth': 400}) || icon : icon
        return(
            <Col md={3} sm={6} xs={12} componentClass="li" className="storyContainer">
                <div className="restaurantContainer">
                    <div name='imageContainer' className="imageContainer">
                        <Image width='300px' height='250px' type='productImage'  url={profileImage} />
                    </div>
                    <div className="restaurantDetails">
                        <div>
                            <span className="name">
                                <TextLimiter value={name} limit={25}/>
                            </span>
                        </div>
                        <div>
                            <Rating className="starRate" ratings={rating} reviews={review} maxRatings={5} />

                        </div>
                        <div>
                            <span>{RestaurantType}</span>

                        </div>
                        <div>
                            <div className="smallTitle">Address</div>
                            <span className="category"><TextLimiter value={vicinity} limit={40}/></span>
                        </div>
                        <div>
                            <span className="smallTitle">Opened Now :</span>
                            <span className="">{opened}</span>
                        </div>
                    </div>
                    <div className="buttonContainer">
                        <Button value="View Details" type="primary" icon='star-o' link={`restaurant/${place_id}`}/>
                    </div>
                </div>
            </Col>
        )
    }

}

export default connect(null, {fetchDetails})(Restaurant);
