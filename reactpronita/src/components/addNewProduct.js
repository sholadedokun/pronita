import React, {Component} from 'react';
import Heading from './heading';
import {Grid, Row, Col} from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {fetchAllCategories, fetchAllSubCategories, addNewProduct} from '../actions/inventoryActions'
import Icon from './icon';
import {renderOption, renderInput, renderTextarea} from './commonFilters'
import _ from 'lodash';
import Button from './button'
import Image from './image'
import Dropzone from 'react-dropzone';

class AddNewProduct extends Component{
    constructor(){
        super()
        this.state={
            allCategories:null,
            currentCategory:'',
            allCurrentSubcategroies:null,
            keyFeatures:[['text','description']],
            specifications:[['text','description']],
            images:[
                {
                    file:'',
                    previewUrl:''
                },
                {
                    file:'',
                    previewUrl:''
                }
            ],
            reviewQuestions:{
                Product:[
                    {
                        Question:'just testing',
                    }
                ],
                Design:[
                    {
                        Question:'',
                    }
                ],
                "User Interface":[
                    {
                        Question:'',
                    }
                ],
                Packaging:[
                    {
                        Question:'',
                    }
                ]

            }
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

    imageUploadManager(index, file){
        //setImage preview
        console.log(file[0].preview)
        let newvalue = [...this.state.images]
        newvalue[index].previewUrl = file[0].preview
        this.setState({
            images: [...newvalue]
        })
    }

    setValue(theState){
        console.log(theState)
    }
    renderImageInput(){
        return(
            this.state.images.map((item, index)=>{
                let imagePreview=(
                    <Dropzone accept={'image/*'} multiple={false} onDrop={this.imageUploadManager.bind(this, index)} className="dragSelectImage">
                        <Icon icon="picture-o" size="md" /><br />
                        Add <Icon icon="plus"/> by clicking or <br />
                        draging an image here.
                    </Dropzone>
                )
                if(item.previewUrl !== '') imagePreview = <Image src={item.previewUrl} />
                return(
                    <li  key={_.uniqueId()} className="eachImage">
                        {item.previewUrl ?
                            <img src={item.previewUrl} width="100%" />:
                            imagePreview
                        }
                    </li>
                )
            })
        )

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
    addMoreQuestions(index){
        let newQuestions={...this.state.reviewQuestions}
        newQuestions[index].push({Questions:''})
        this.setState({reviewQuestions:newQuestions})

    }
    renderReviewQuestions(){
        return(
            _.map(this.state.reviewQuestions, (item, index )=>
                {
                    return(
                        <div key={_.uniqueId()} className="field">
                            <div>{index} </div>
                            {
                                item.map((questions, numIndex )=>{
                                    return(
                                        <Field
                                            key={_.uniqueId()}
                                            component={renderTextarea}
                                            name={`${index}_${numIndex}`}
                                            placeholder="Please type a brief Question" rows="7"
                                            onChange={this.setValue.bind(this,'reviewQuestions', 'Question', index, numIndex)}
                                            defaultValue={this.state.reviewQuestions[index][numIndex].Question}
                                        />
                                    )
                                })

                            }
                            <Button type="primary" icon="plus" value="Add More Questions" size="sm" onClick={this.addMoreQuestions.bind(this, index)} />
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
                    allCurrentSubcategroies:this.props.subCategories.filter((item)=> item.category._id == response)
                })
            )
        }
        else{
            this.setState({
                currentCategory:event.target.value,
                allCurrentSubcategroies:  this.props.subCategories.filter((item)=> item.category._id == event.target.value)

            })
        }

    }
    onSubmit(values){
        //call action creators to upload the product...
        this.props.addNewProduct(values, _.pick(this.state, ['images','currentCategory','selectedCategory']))
        // .then(data=> this.props.history.push('/userAccount'))
    }
    render(){

        let {allCategories, allCurrentSubcategroies}=this.state
        const {handleSubmit}=this.props;
        // let categoryOptions=["Please wait, categories are loading"];
        // let subCategoryOptions=["Please wait, subCategories are loading"];
        return(
            <Col xs={12} className="addNewProduct">
                <Heading size="md" title="Add New Product" icon="plus" marginBottom='1em' />

                <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                    <Col xs={12}>
                        <Heading size="sm" title="General Details" />
                        <div className="field half">
                            <select name="category" onChange={this.getSubCategories} value={this.state.currentCategory}>
                                {renderOption(allCategories, '_id', 'name')}
                            </select>
                        </div>
                        <div className="field half">
                            <select name="subCategory" onChange={(e)=>this.setState({selectedCategory:e.target.value})} >
                                {renderOption(allCurrentSubcategroies, '_id', 'SubCategoryname')}
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
                            {this.renderImageInput()}
                        </ul>
                    </Col>
                    <Col xs={12}>
                        <Heading size="sm" title="Review Questions" />
                        <ul className="uploadImage">
                            {this.renderReviewQuestions()}
                        </ul>
                    </Col>

                    <Button type="primary" action="submit" value="Save" icon="save" />
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
    connect(mapStateToProps, {fetchAllCategories, fetchAllSubCategories, addNewProduct})(AddNewProduct)
)
