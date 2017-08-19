import React, {Component} from 'react';
import Heading from './heading';
import {Grid, Row, Col} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {fetchAllCategories, fetchAllSubCategories} from '../actions/inventoryActions'
import Icon from './icon';
import {renderOption} from './commonFilters'

class AddNewProduct extends Component{
    constructor(){
        super()
        this.state={
            allCategories:null,
            currentCategory:null,
            currentSubcategroies:null
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

    renderInput(field){
        const {meta:{touched, error}} = field;
        const classN= `${ touched && error ? 'inputError':'' }`;
        return(
            <span>
                <input className={classN}  type={field.type} name={field.name} placeholder={field.placeholder} {...field.input} />
                <span className='textError'>{touched ? error : ''}</span>
            </span>
        )
    }
    render(){

        let {allCategories, currentSubcategroies}=this.state
        // let categoryOptions=["Please wait, categories are loading"];
        // let subCategoryOptions=["Please wait, subCategories are loading"];
        return(
            <Col xs={12} className="addNewProduct">
                <Heading size="md" title="Add New Product" icon="plus" marginBottom='1em' />
                <Heading size="sm" title="General Details" />
                <form>
                    <div className="field half">
                        <Field component={this.renderInput} type="text" name="title" id="title" placeholder="Name of your product / services" />
                    </div>
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
    // if (!formProps.lastName) {
    //     errors.lastName = 'Please enter your last Name';
    // }
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
