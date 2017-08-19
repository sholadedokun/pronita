import React from 'react';
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
    return(
        _.map(allOptions, (item, index)=>{
            return(
                <option key={_.uniqueId()} value={item[value]}>{item[name]}</option>
            )
        })
    )

}
