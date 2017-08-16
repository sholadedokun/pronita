import React from 'react';
export default (props)=>{
    const style={
        sm:{
            fontSize: "16px",
            marginBottom: props.marginBottom
        }
    }
    return(
        <div className="headings">
            {props.size=='lg'?<h1 style={style[props.size]}>{props.title}</h1>:
                props.size=='md'?<h2 style={style[props.size]}>{props.title}</h2>:
                    props.size=='sm'?<h3 style={style[props.size]}>{props.title}</h3>:
                    <h1 style={style[props.size]}>props.title</h1>
            }
            <p>{props.children}</p>
        </div>
    )

}
