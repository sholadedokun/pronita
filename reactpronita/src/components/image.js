import React from 'react';

export default ({url, width, height, type, action})=>{
    // console.log(parentSize[0])
    let style={
        productImage:{
            background: `url(${url}) no-repeat center`,
            width:'auto',
            height,
            overflow: 'hidden'
        },
        profileImage:{
            background: `url(${url}) no-repeat center`,
            width: 'auto',
            height: '100px',
            overflow: 'hidden',
            borderRadius: '50%'
        },
        thumbnail:{
            background: `url(${url}) no-repeat center`,
            width: '50px',
            height: '50px',
            float: 'left',
            margin: '5px',
            cursor: 'pointer',
            overflow: 'hidden'
        }
    }
    let image= (action)? <div onClick={action} style={style[type]}></div> : <div  style={style[type]}></div> 
    return(
        image
    )



}
