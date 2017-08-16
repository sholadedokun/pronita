import React, {Component} from 'react'
import loading from './HOC/loading'
import Offer from './offer'
class Product extends Component{
    render(){
        const {products, noProductMessage} = this.props
        const allProducts= products.map(item=>{
            return(
                <Offer key={item._id} {...item} />
            )
        })
        console.log(products)
        return (
            products > 0 ? allProducts :
            <div>{noProductMessage}</div>
        )

    }
}
export default loading(Product)
