import React from 'react';
import Icon from './icon';
import {Link} from 'react-router-dom';
export default ({type, onClick, icon, size, value, link, action})=>{
    let className='button'+(type ? ' '+type:'')+(size ? ' '+size: '')
    let buttonValue = value || 'Submit'
    let button = (link) ? <Link to={link} className={className} > {buttonValue} </Link> :

                        (action)?
                        <button className={className} onClick={onClick}> <Icon  icon={icon}/> {buttonValue}</button>
                        :
                        <button className={className} onClick={onClick} action={action}> <Icon  icon={icon}/> {buttonValue}</button>


    return(
        button

    )
}
