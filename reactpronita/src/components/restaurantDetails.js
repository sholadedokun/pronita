import React, {Component} from 'react';
import { fetchDetails } from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import Rating from './rating';
import Button from './button';
import Image from './image';
import Review from './review';
import {Link} from 'react-router-dom';
import {Grid, Row, Col} from 'react-bootstrap';
class restuarantDetails extends(Component){
    constructor(){
        super()
        this.state={
            profileImage:''
        }
        this.setDefaultVariables=this.setDefaultVariables.bind(this)
    }
    componentWillMount(){
        if( this.props.restaurantDetails){
            this.setDefaultVariables( this.props.restaurantDetails)
        }
    }
    componentDidMount(){
        if(this.props.position){
            this.props.fetchDetails(this.props.position, this.props.match.params.id)
        }

    }

    setDefaultVariables(restaurantProps){
        this.setState({
            ...restaurantProps,
            profileImage : restaurantProps.photos ? restaurantProps.photos[0].getUrl({'maxWidth': 600}) || restaurantProps.icon : restaurantProps.icon,

        })
    }
    //if we new list of restaurant was received ... then go back to home page to view them
    componentWillReceiveProps(nextProps){
        if(!(_.isEqual(this.props.allRestaurants, nextProps.allRestaurants))){
            this.props.history.push('/');
        }
        if(nextProps.position){
            this.props.fetchDetails(nextProps.position, this.props.match.params.id)
        }
        if( nextProps.restaurantDetails){
            this.setDefaultVariables(nextProps.restaurantDetails)
        }
    }
    //route user to the google page, so that user can leave a review
    addUserReview(){
        var win = window.open(`https://search.google.com/local/writereview?placeid=${this.props.match.params.id}`, '_blank');
        win.focus();
    }

    changeMainImage(url){
        this.setState({
            profileImage:url.getUrl({'maxWidth': 600})
        })
    }
    render(){
        var profileImage, photos, icon, name, reviews, allReviews = '';
        if(reviews){
            allReviews = reviews.map((review)=>{
                return(
                    <Review key={review.time} {...review} />
                )
            })
        }
        return(
            <Grid className="restaurantDetailsContainer">
                <Row className="restaurantHead ">
                    <Link to="/"><span className="fa fa-arrow-left"> </span> Back To Restaurant List View </Link>
                </Row>

            {
                this.props.restaurantDetails ? (
                    <Row >
                        <Col xs={12} md={6} className="detailsPhoto">
                            <Image width='200px' height='300px' type='productImage' url={this.state.profileImage} />
                            {
                                this.state.photos.map((photo)=>{
                                    //notice that the changeMainImage was sent to the dump controller to be called...
                                    return(
                                        <Image key={_.uniqueId()} type="thumbnail" action={this.changeMainImage.bind(this, photo)} url={photo.getUrl({'maxWidth': 400})} />
                                    )
                                })

                            }
                        </Col>
                        <Col xs={12} md={6}  className="detailsDescription nop">
                            <Col className="detailViewList" xs={12} >
                                <h2>{this.state.name}</h2>
                            </Col>
                            <Col className="detailViewList"  xs={12} >
                                    <span className="fa fa-map-marker"></span>
                                    <span className="detailLabel">Address</span>
                                    <Col xs={12} sm={6} >{this.state.formatted_address}</Col>
                            </Col>
                            <Col className="detailViewList"  xs={12} >
                                <span className="fa fa-mobile"></span>
                                <span className="detailLabel">Phone</span>
                                <Col xs={12} sm={6} >{this.state.formatted_phone_number}</Col>
                            </Col>
                            <Col className="detailViewList"  xs={12}>
                                <span className="fa fa-phone"></span>
                                <span className="detailLabel">Internation Phone Number</span>
                                <Col xs={12} sm={6} >{this.state.international_phone_number}</Col>
                            </Col>
                            <Col className="detailViewList"  xs={12} >
                                <span className="fa fa-globe"></span>
                                <span className="detailLabel">Website</span>
                                <Col xs={12} sm={6} ><a href={this.state.website} target="_blank">{this.state.website}</a></Col>
                            </Col>
                            <Col className="detailViewList"  xs={12} >
                                <span className="fa fa-check-square-o"></span>
                                <span className="detailLabel">Opened Now</span>
                                {this.state.opening_hours.open_now ? 'Yes': 'No'}
                            </Col>
                            <Col className="detailViewList"  xs={12} >
                                <span className="fa fa-calendar-check-o"></span>
                                <span className="detailLabel">Daily Open Times</span>
                                <Col xs={12}>
                                    {
                                        this.state.opening_hours.weekday_text.map((weekday)=>{
                                            return(
                                                <Col xs={6} key={weekday}>{weekday}</Col>
                                            )}

                                        )
                                    }
                                </Col>
                            </Col>
                            <Col className="detailViewList" xs={12} >
                                <h3>Reviews</h3>
                                {allReviews}
                                <Button type="primary"  action={this.addUserReview.bind(this)} icon="plus" value="Add A Review"  />
                            </Col>
                        </Col>
                    </Row>

                )
                :
                <Row> Loading </Row>
            }
            </Grid>
        )


    }
}
function mapStateToProp(state){
    return {
        restaurantDetails:state.allRestaurants.restaurantDetails,
        position : state.allRestaurants.position,
        allRestaurants :  state.allRestaurants.newRestaurants
    }
}
export default connect(mapStateToProp, {fetchDetails})(restuarantDetails)
