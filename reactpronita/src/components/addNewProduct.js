import React, {Component} from 'react';
import Heading from './heading';
import {Grid, Row, Col} from 'react-bootstrap';
import { Field, FieldArray, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {fetchAllCategories, fetchAllSubCategories, addNewProduct} from '../actions/inventoryActions'
import Icon from './icon';
import {renderOption, renderTextarea} from './commonFilters'
import _ from 'lodash';
import Button from './button'
import Image from './image'
import Dropzone from 'react-dropzone';
import ProductForm from './productForm'

class AddNewProduct extends Component{
    constructor(){
        super()
        this.state={
            allCategories:null,
            category:'',
            allCurrentSubcategroies:null,
            selectedCategory:'',
            selectedType:'',
            selectedSubType:'',
            selectedStatus:'Inactive',
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
            file:[],
            reviewQuestions:[
                "Product",
                "Design",
                "User Interface",
                "Packaging"
            ],
            type:{
                'Select Product Type':{title:'Select Product Type'},
                Software:{
                    title:'Software',
                    subType:['Web App', 'Mobile App', 'Desktop App', 'Others'],
                    accessUrl:[
                        {title:'', url:''}
                    ]
                },
                "Services/Consultation":{
                    title:'Services/Consultation',
                },
                "Item/Hardware/Appliances":{
                    title:'Item/Hardware/Appliances',
                }
            },
            rate:{
                type:['License','Discounted','Free','Trial'],
                duration:['Minutes', 'Hours', 'Days', 'Weeks', 'Months', 'Year'],
                value:'',
                availableQuantity:''
            },
            status:['Active', 'Inactive']
        }
        this.getSubCategories=this.getSubCategories.bind(this)
    }
    componentWillMount(){
        if(!this.props.allCategories)this.props.fetchAllCategories()
        .then(response=>{
            this.props.allCategories.unshift({name:'Select a Category', _id:0});
            this.setState({allCategories: this.props.allCategories})
            }

        )
    }
    parseSpecificationJSX(item, index, label, objectName ){
        let allFields=[];
        for(let field in item){
            switch(field){
                case 'title':
                    allFields.push(<Field key={_.uniqueId()} value={this.state[(objectName || label)][index][field]} component={this.renderInput} onChange={this.updateState.bind(this,[objectName || label], index, field)} type="text" name={`${objectName || label}_title_${index}`}  placeholder={`Type ${label} title`} />);
                    break;
                case 'description':
                    allFields.push(<Field key={_.uniqueId()} value={this.state[(objectName || label)][index][field]} component={renderTextarea} onChange={this.updateState.bind(this,[objectName || label], index,field)} name={`${objectName || label}_description_${index}`}  placeholder={`please describe the ${label} `} rows="7" />);
                    break;
            }

        }
        return allFields
    }
    renderInput(field){
        const {meta:{touched, error}} = field;
        const classN= `${ touched && error ? 'inputError':'' }`;
        field.input.name= field.input.name.replace(' ', '')
        return(
            <span>
                <input className={classN}  type={field.type} placeholder={field.placeholder}  {...field.input} />
                <span className='textError'>{touched ? error : ''}</span>
            </span>
        )
    }
    renderSelect(field){

        const {meta:{touched, error},optionArray, input} = field;
        const classN= `${ touched && error ? 'inputError':'' }`;
        field.input.name= field.input.name.replace(' ', '')
        console.log(field)
        return(

            <span>
                <select  className={classN}  {...input}>
                    {renderOption(optionArray)}
                </select>
                <span className='textError'>{touched ? error : ''}</span>
            </span>
        )
    }
    imageUploadManager(index, file, ){
        //setImage preview
        let newfile= [...this.state.file , file[0]]
        let newvalue = [...this.state.images]
        newvalue[index].previewUrl = file[0].preview
        newvalue[index].file= file[0].name
        this.setState({
            images: [...newvalue], file:newfile
        })
    }
    updateState(){

        let stateToChange='';
        if(arguments.length==6){
            stateToChange=[...this.state[arguments[0]]];
            stateToChange[arguments[1]][arguments[2]]=arguments[3].target.value
        }
        else{
            stateToChange={...this.state[arguments[0]]};
            stateToChange[arguments[1]][arguments[2]][arguments[3]]=arguments[4].target.value
        }
        this.setState({
            [arguments[0]]: stateToChange
        })
        // console.log(stateToChange)
        // console.log( arguments)
    }
    removeImage(index){
        let newImages=[...this.state.images];
        newImages.splice(index, 1);
        this.setState({images:newImages})
    }
    addMoreImage(){
        this.setState({images:[...this.state.images, {file:'',previewUrl:''}]})
    }
    renderImageInput(){
        let allImages=this.state.images
        return(

            allImages.map((item, index)=>{
                return(
                    <li  key={_.uniqueId()}>
                        {
                            (item.previewUrl !== '')?
                            <div  className="eachImage">
                                <img src={item.previewUrl} width="100%" />
                                <div className="imageSettings">
                                    <span>{item.ImageInfo}</span>
                                    {item.ImageCrop?<span>CROP</span> : ''}
                                    <span onClick={this.removeImage.bind(this, index)}><Icon icon="trash-o" /> Delete</span>
                                </div>

                            </div>
                            :
                            <div className="eachImage">
                                {
                                    (index===(allImages.length-1) && allImages.length < 6)?
                                    <div onClick={this.addMoreImage.bind(this)} className="dragSelectImage">
                                        <Icon icon="plus" size="md" /><br />
                                        Add More Images
                                    </div>:
                                    <Dropzone accept={'image/*'} multiple={false} onDrop={this.imageUploadManager.bind(this, index)} className="dragSelectImage">
                                       <Icon icon="picture-o" size="md" /><br />
                                       <Icon icon="plus"/> Add by clicking or <br />
                                       draging an image here.
                                    </Dropzone>
                                }
                            </div>
                        }
                    </li>

                )
            })
        )

    }
    renderSpecifications({ fields, meta: {error} }){
        return(
        <div>
            <ul>

                {
                    fields.map((member, index) =>
                        <li key={index}>

                            <h4>
                                {fields.name} #{index + 1}
                            </h4>
                            <Field
                                name={`${member}.title`}
                                type="text"
                                component={this.renderInput}
                                label="First Name"
                            />
                            <Field name={`${member}.description`} component={renderTextarea} />
                            <button
                                type="button"
                                title={`Remove ${fields.name}`}
                                onClick={() => fields.remove(index)}
                            >
                            Delete
                            </button>
                        </li>
                )}
                <button type="button" className="button primary sm" onClick={(e)=>fields.push()}><Icon icon="plus" />{`Add ${fields.length>0?'More': ''} ${fields.name}`}</button>
            </ul>
        </div>
        )
    }
    renderSubTypesLink({ fields, meta: {error} }){
        return(
        <div>
            <ul>
                {
                    fields.map((member, index) =>
                        <li key={index}>
                            <h4>
                                {fields.name} #{index + 1}
                            </h4>
                            <Field
                                name={`${member}`}
                                type="text"
                                component={this.renderInput}
                                label="Download Link Or Web Access"
                            />
                            <button
                                type="button"
                                title={`Remove ${fields.name}`}
                                onClick={() => fields.remove(index)}
                            >
                            Delete
                            </button>
                        </li>
                )}
                <button type="button" className="button primary sm" onClick={(e)=>fields.push()}><Icon icon="plus" />{`Add ${fields.length>0?'More': ''} ${fields.name}`}</button>
            </ul>
        </div>
        )
    }
    renderSubTypes({ fields, meta: {error} }){
        return(
        <div>
            <ul>
                {
                    fields.map((member, index) =>
                        <div key={index} className="field half">
                            <h4>
                                {fields.name} #{index + 1}
                            </h4>
                            <Field
                                name={`${member}.title`}
                                optionArray={this.state.type[this.state.selectedType].subType}
                                component={this.renderSelect.bind(this)}
                                label="Download Link Or Web Access"
                            />
                            <FieldArray name="Access Link" component={this.renderSubTypesLink.bind(this)} />
                            <button
                                type="button"
                                title={`Remove ${fields.name}`}
                                onClick={() => fields.remove(index)}
                            >
                            Delete
                            </button>
                        </div>
                )}
                <button type="button" className="button primary sm" onClick={(e)=>fields.push()}><Icon icon="plus" />{`Add ${fields.length>0?'More': ''} ${fields.name}`}</button>
            </ul>
        </div>
        )
    }
    addMoreQuestions({ fields, meta: {error} }){
        return(
            <ul>
                {
                    fields.map((member, index)=>
                    <li key={_.uniqueId()}>
                        <h4>{fields.name} {index+1}</h4>
                        <Field

                            component={renderTextarea}
                            name={member}
                            placeholder="Please type a brief Question" rows="7"
                        />
                        <button type="button" title={`Remove ${member} ${index +1}`} onClick={()=>fields.remove(index)}>remove</button>
                    </li>
                    )
                }
                <button type="button" className="button primary sm"  onClick={()=>fields.push()}><Icon icon="plus" />Add More Question</button>
            </ul>

        )
    }
    renderReviewQuestions(){
        return(
            _.map(this.state.reviewQuestions, (item, index )=>
                {
                    return(
                        <li key={_.uniqueId()} className="field">
                            <Col xs={12} >{item} </Col>
                            <FieldArray
                                name={item}
                                component={this.addMoreQuestions.bind(this)}
                            />
                        </li>
                    )
                }
            )
        )
    }
    addMoreFeatures(type, e){
        e.preventDefault()
        let defaultValue = {title:'', description:'' }
        let read= [...this.state[type], defaultValue]
        this.setState({
            [type]: read
        })
    }
    getSubCategories(event){
        if(!this.props.subCategories){
            this.props.fetchAllSubCategories(event.target.value)
            .then(response=>{
                let allSubcategories=this.props.subCategories.filter((item)=> item.category._id == response);
                allSubcategories.unshift({SubCategoryname:'Select a subCategory', _id:0})
                this.setState({
                    category:response,
                    allCurrentSubcategroies:allSubcategories
                })
            })
        }
        else{
            let allSubcategories=this.props.subCategories.filter((item)=> item.category._id == event.target.value);
            allSubcategories.unshift({SubCategoryname:'Select a subCategory', _id:0})
            this.setState({
                category:event.target.value,
                allCurrentSubcategroies:  allSubcategories
            })
        }

    }

    onSubmit(values){
        //call action creators to upload the product...
        this.props.addNewProduct(values).then(data=> this.props.history.push('/userAccount'))
    }
    render(){

        let {allCategories, allCurrentSubcategroies, category, selectedType, type, rate, status, selectedStatus}=this.state;
        console.log(category);
        const {handleSubmit}=this.props;
        // let categoryOptions=["Please wait, categories are loading"];
        // let subCategoryOptions=["Please wait, subCategories are loading"];
        return(
            <ProductForm allCategories={allCategories} category={category} allCurrentSubcategroies={allCurrentSubcategroies} onFormSubmit={this.onSubmit.bind(this)} fetchSubCategories={this.getSubCategories.bind(this)} />
        )
    }
}
function validate(formProps) {
    const errors = {};
    if (!formProps.name) {
        errors.name = 'Please enter your Product/service Name';
    }
    if (!formProps.description) {
        errors.description = 'Please enter your product or service Brief';
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
