import React from 'react';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';

export function TextLimiter ({value, limit}){
    if(value.length > limit && (value.length > (limit+2))){
        value = value.substring(0, limit)
        value+=' ...'
    }
    return(
        <span>{value}</span>
    )
}
export function Pluralise ({count, singluar, plura}){
    return(
        <span>{count>1? plura:singluar}</span>
    )
}
export function renderOption(allOptions, value, name){
    // console.log(allOptions)
    return(
        _.map(allOptions, (item, index)=>{
            let optionValue= (value) ? item[value] : item
            let OptionName= (name) ? item[name] : item
            return(
                <option key={_.uniqueId()} value={optionValue}>{OptionName}</option>
            )
        })
    )
}
export function renderInput(field){
    const {meta:{touched, error}} = field;
    const classN= `${ touched && error ? 'inputError':'' }`;
    return(
        <span>
            <input className={classN}  type={field.type} name={field.name} placeholder={field.placeholder} value={field.value} {...field.input} />
            <span className='textError'>{touched ? error : ''}</span>
        </span>
    )
}
export function renderTextarea(field){
        const {meta:{touched, error}} = field;
        const classN= `${ touched && error ? 'inputError':'' }`;
        return(
            <span>
                <textarea className={classN}  name={field.name} placeholder={field.placeholder} {...field.input}>
                {field.defaultValue}
                </textarea>
                <span className='textError'>{touched ? error : ''}</span>
            </span>
        )
    }
//always remember to bind 'this' whenever this function
export function renderAlert() {
  if (this.props.errorMessage) {
    return (
      <div className="alert alert-danger">
        <strong>Oops!</strong> {this.props.errorMessage}
      </div>
    );
  }
}
