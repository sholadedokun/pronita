import React, {Component} from 'react';
import Heading from './heading';
import {Grid, Row, Col} from 'react-bootstrap';
class userProfile extends (Component){
    componentWillMount(){

    }
    render(){
        return(
            <Grid className="newPage">
                <Row className="">
                    <Col xs={12} md={3} className="userMenu">
                        <Heading title="Menu" marginBottom="5px" size="sm">
                            the menu as a description
                        </Heading>
                        <Col xs={12}>

                        </Col>
                    </Col>
                    <Col xs={12} md={9}>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default userProfile
