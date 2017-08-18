import React from 'react';
import Icon from './icon'
export default (props)=>{
    const style={
        sm:{
            fontSize: "1.2em",
            marginBottom: props.marginBottom
        },
        md:{
            fontSize: "1.8em",
            marginBottom: props.marginBottom
        }
    }
    return(
        <div className="headings">
            {props.size=='lg'?<h1 style={style[props.size]}><Icon icon={props.icon} /> {props.title}</h1>:
                props.size=='md'?<h2 style={style[props.size]}><Icon icon={props.icon} /> {props.title}</h2>:
                    props.size=='sm'?<h3 style={style[props.size]}><Icon icon={props.icon} /> {props.title}</h3>:
                    <h1 style={style[props.size]}>props.title</h1>
            }
            <p>{props.children}</p>
        </div>
    )

}
