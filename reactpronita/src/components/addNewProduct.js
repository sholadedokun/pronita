import React from 'react';

export default ({type, icon, size})=>{
    let className='fa fa-'+icon+(size ? ' '+size: '')+(type ? ' '+type: '')
    return(
        <span className={className}></span>
    )
}
