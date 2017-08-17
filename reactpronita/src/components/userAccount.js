import React, {Component} from 'react';
import Heading from './heading';
import {Grid, Row, Col} from 'react-bootstrap';
import ProductContainer from './productContainer'
import Addnew from './addNewProduct'
import Icon from './icon'
import _ from 'lodash'
import {connect} from 'react-redux'
import {fetchProduct} from '../actions/userActions'
class userProfile extends (Component){
    constructor(props){
        super();

        this.setCurrentDisplay=this.setCurrentDisplay.bind(this);
        this.state={
            currentDisplayedComponent:<ProductContainer noProductMessage={this.noProductMessage} products={props.offers} filter="myProduct" />,

        }
    }
    componentWillMount(nextProps){
        this.props.fetchProduct()
    }
    componentWillUpdate(nextProps){
        if(nextProps.offers !== this.props.offers){
            this.setState({
                currentDisplayedComponent:<ProductContainer noProductMessage={this.noProductMessage} products={nextProps.offers} filter="myProduct" />
            })
        }

        console.log()
    }

    setCurrentDisplay(nextDisplay){
        console.log(nextDisplay);
    }
    noProductMessage=
        <div className="">
            {`You've not added a product yet.`}<br />
            <a onClick={this.setCurrentDisplay(<Addnew icon="plus" />)}>Add New Product</a>
        </div>
    renderMenu(){
        let menuList={
            addNew:{
                label:'Add a new Product',
                name:'addNew',
                icon:'plus',
                component: <Addnew icon="plus" />
            },
            viewProduct:{
                label:'view all Products',
                name:'viewProduct',
                icon:'eye',
                component:<ProductContainer filter="myProduct" />
            },
            productReviewed:{
                label:'Products I\'ve reviewed',
                icon:'eye',
                component:<ProductContainer filter="myReview" />
            }
        }
        return(_.map(menuList, (item)=>{
                return(
                    <li key={item.name} onClick={this.setCurrentDisplay(item.component)}>
                        <Icon icon={item.icon} /> {item.label}
                    </li>
                )
            })
        )
    }
    render(){
            // const currentDisplayedComponent = <ProductContainer noProductMessage={this.state.noProductMessage} products={nextProps.offers} filter="myProduct" />
        return(
            <Grid className="newPage">
                <Row className="">
                    <Col xs={12} md={3} className="userMenu">
                        <Heading title="Menu" marginBottom="5px" size="sm"/>
                        <Col componentClass="ul"  xs={12}>
                            {this.renderMenu()}
                        </Col>
                    </Col>
                    <Col xs={12} md={9}>
                        {this.state.currentDisplayedComponent}
                    </Col>
                </Row>
            </Grid>
        )
    }
}
function mapStateToProps(state){
    return{
        offers: state.user.products
    }
}

export default connect(mapStateToProps, {fetchProduct})(userProfile)
