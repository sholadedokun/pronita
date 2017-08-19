import React, {Component} from 'react';
import Heading from './heading';
import {Grid, Row, Col} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {fetchAllCategories, fetchAllSubCategories} from '../actions/inventoryActions'
import Icon from './icon';
import {renderOption, renderInput, renderTextarea} from './commonFilters'
import _ from 'lodash';
import Button from './button'
import Image from './image'

class AddNewProduct extends Component{
    constructor(){
        super()
        this.state={
            allCategories:null,
            currentCategory:'',
            currentSubcategroies:null,
            keyFeatures:[['text','description']],
            specifications:[['text','description']],
            image:[{
                file:'',
                previewUrl:''
            }]
        }
        this.getSubCategories=this.getSubCategories.bind(this)
    }
    componentWillMount(){
        if(!this.props.allCategories)this.props.fetchAllCategories()
        .then(response=>
            this.setState({allCategories: this.props.allCategories
            })
        )
    }
    parseSpecificationJSX(item, index, label ){
        let allFields=[]
        for(let field in item){
            switch(item[field]){
                case 'text':
                    allFields.push(<Field key={_.uniqueId()} component={renderInput} type="text" name={`${label}_title_${index}`}  placeholder={`Type ${label} title`} />);
                    break;
                case 'description':
                    allFields.push(<Field key={_.uniqueId()} component={renderTextarea} name={`${label}_description_${index}`}  placeholder={`please describe the ${label} `} rows="7" />);
                    break;
            }

        }
        return allFields
    }
    renderSpecifications(specification, label){
        return(
            specification.map((item, index )=>
                {
                    return(
                        <div key={_.uniqueId()} className="field">
                            <div>{label} {index+1}</div>
                            {
                                this.parseSpecificationJSX(item, index, label)
                            }


                        </div>
                    )
                }
            )
        )
    }
    addMoreFeatures(type, e){
        e.preventDefault()
        let defaultValue = this.state[type][0]
        let read= [...this.state[type], defaultValue]
        this.setState({
            [type]: read
        })
    }
    getSubCategories(event){

        if(!this.props.subCategories){
            this.props.fetchAllSubCategories(event.target.value)
            .then(response=>
                this.setState({
                    currentCategory:response,
                    currentSubcategroies:this.props.subCategories.filter((item)=> item.category._id == response)
                })
            )
        }
        else{
            this.setState({
                currentCategory:event.target.value,
                currentSubcategroies:  this.props.subCategories.filter((item)=> item.category._id == event.target.value)

            })
        }

    }
    render(){

        let {allCategories, currentSubcategroies}=this.state
        // let categoryOptions=["Please wait, categories are loading"];
        // let subCategoryOptions=["Please wait, subCategories are loading"];
        return(
            <Col xs={12} className="addNewProduct">
                <Heading size="md" title="Add New Product" icon="plus" marginBottom='1em' />

                <form>
                    <Col xs={12}>
                        <Heading size="sm" title="General Details" />
                        <div className="field half">
                            <select name="category" onChange={this.getSubCategories} value={this.state.currentCategory}>
                                {renderOption(allCategories, '_id', 'name')}
                            </select>
                        </div>
                        <div className="field half">
                            <select name="subCategory" >
                                {renderOption(currentSubcategroies, '_id', 'SubCategoryname')}
                            </select>
                        </div>
                        <div className="field half">
                            <Field component={renderInput} type="text" name="title" id="title" placeholder="Name of your product / services" />
                        </div>
                        <div className="field half">
                            <Field component={renderTextarea} name="productBrief" id="productBrief" placeholder="Give a brief description of your product/service" rows="7" />
                        </div>
                    </Col>
                    <Col xs={12}>
                        <Heading size="sm" title="Key Features" />
                            {this.renderSpecifications(this.state.keyFeatures, 'key Features')}
                            <Button type="primary" icon="plus" value="Add More Key Features" size="sm" onClick={this.addMoreFeatures.bind(this, 'keyFeatures')} />
                    </Col>
                    <Col xs={12}>
                        <Heading size="sm" title="Specifications" />
                            {this.renderSpecifications(this.state.specifications, 'specifications')}
                            <Button type="primary" icon="plus" value="Add More Specifications" size="sm" onClick={this.addMoreFeatures.bind(this, 'specifications')} />
                    </Col>
                    <Col xs={12}>
                        <Heading size="sm" title="Add Product Image" />
                        <ul className="uploadImage">
                            <li className="eachImage">
                                <div className="dragSelectImage">
                                    <Icon icon="picture-o" size="md" /><br />
                                    Add <Icon icon="plus"/> by clicking or <br />
                                    draging an image here.
                                </div>
                                <Image />
                            </li>
                        </ul>
                    </Col>


                </form>
            </Col>
        )
    }
}
function validate(formProps) {
    const errors = {};
    if (!formProps.title) {
        errors.title = 'Please enter your Product/service Name';
    }
    if (!formProps.productBrief) {
        errors.productBrief = 'Please enter your product or service Brief';
    }
    // if (!formProps.userName) {
    //     errors.userName = 'Please enter your user Name';
    // }
    // if (!formProps.email) {
    //     errors.email = 'Please enter an email';
    // }
    //
    // if (!formProps.password) {
    //     errors.password = 'Please enter a password';
    // }
    //
    // if (!formProps.conPassword) {
    //     errors.conPassword = 'Please enter a password confirmation';
    // }
    //
    // if (formProps.password !== formProps.conPassword && formProps.conPassword) {
    //     errors.password = 'Passwords must match';
    // }

    return errors;
}
function mapStateToProps(state) {
  return { errorMessage: state.user.error,
           allCategories: state.inventory.allCategories,
           subCategories: state.inventory.subCategories
   };
}
export default reduxForm({
    validate,
    form: 'addNewProduct'
})(
    connect(mapStateToProps, {fetchAllCategories, fetchAllSubCategories})(AddNewProduct)
)
