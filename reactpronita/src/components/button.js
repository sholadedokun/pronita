import React from 'react';
import Icon from './icon';
import {Link} from 'react-router-dom';
export default ({type, action, icon, size, value, link})=>{
    let className='button'+(type ? ' '+type:'')+(size ? ' '+size: '')
    let buttonValue = value || 'Submit'
    let button = (link) ? <Link to={link} className={className} > {buttonValue} </Link> :
                    <button className={className} onClick={action}> <Icon  icon={icon}/> {buttonValue}</button>

    return(
        button

    )
}
