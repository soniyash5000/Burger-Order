import React from 'react';
import classes from './Input.module.css'; 
const  Input =(props) => {
    let inputElemnet = null;
    const inputClasses =[classes.InputElement]

    if(props.invalid && props.shouldValidate && props.touched)
    {
        inputClasses.push(classes.Invalid)
    }


    switch(props.elementType){
        case('input'):
            inputElemnet =<input 
            className={inputClasses.join(' ')} 
            {...props.elementConfig}  
            value={props.value} 
            onChange={props.changed}/>;
            break;
        case('textarea'):
            inputElemnet =<textarea 
            className={inputClasses.join(' ')} 
            {...props.elementConfig}  
            value={props.value} 
            onChange={props.changed}/>;
            break;
        case('select'):
            inputElemnet =(<select 
            className={inputClasses.join(' ')} 
            value={props.value} 
            onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option value={option.value} key = {option.value}>
                        {option.displayValue}
                    </option>
                ))}
                </select>);
            break;
        default :
            inputElemnet = <input 
            className={inputClasses.join(' ')} 
            {...props.elementConfig}  
            value={props.value} 
            onChange={props.changed}/> ;
    }
    return(
        <div className={classes.Input} >
            <label className={classes.Label}>{props.label}</label>
            {inputElemnet}
        </div>
    );
}

export default Input;