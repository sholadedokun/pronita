import React from 'react';
import Icon from './icon';
import Image from './image';
import Rating from './rating';
import {Col} from 'react-bootstrap';
export default ({author_name, profile_photo_url, rating, relative_time_description, text})=>{
    return(
        <div className="review">
            <Col xs={6} md={3}><Image url={profile_photo_url} type='profileImage'  /></Col>
            <Col xs={12} md={9}>
                <h4>{author_name}</h4>
                <Rating  className="starRate"  ratings={rating} maxRatings={5} />
                <span>{relative_time_description}</span>
                <Col className="nop" xs={12} >{text} </Col>
                <Col className="reviewDivider" xsOffset={4} xs={2} ></Col>
            </Col>
        </div>
    )
}
