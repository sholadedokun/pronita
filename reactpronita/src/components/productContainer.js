import React, {Component} from 'react'
import loading from './HOC/loading'
import Offer from './offer'
import {Col} from 'react-bootstrap';
class Product extends Component{
    render(){
        const {products, noProductMessage} = this.props
        const allProducts= products.map(item=>{
            return(
                <Offer key={item._id} {...item} />
            )
        })
        console.log(products, allProducts)
        return (


                    (products && products.length > 0) ? <Col componentClass="ul" xs={12}> {allProducts} </Col>:
                    <Col xs={12}>{noProductMessage}</Col>
                

        )

    }
}
export default loading(Product)
