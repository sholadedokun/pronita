import React, {Component} from 'react'
import loading from './HOC/loading'
import Offer from './offer'
import {Link} from 'react-router-dom';
import {Col} from 'react-bootstrap';
class Product extends Component{
    render(){
        const {products} = this.props
        const allProducts= products.map(item=>{
            return(
                <Offer key={item._id} {...item} />
            )
        })
        console.log(products, allProducts)
        return (


                    (products && products.length > 0) ? <Col componentClass="ul" xs={12}> {allProducts} </Col>:
                    <Col xs={12}>

                        {`You've not added any product yet.`}<br />
                        <Link to="/userAccount/add-product">Add New Product</Link>

                    </Col>


        )

    }
}
export default loading(Product)
