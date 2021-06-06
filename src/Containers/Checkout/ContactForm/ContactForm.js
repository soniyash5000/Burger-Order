import { Component } from "react";
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactForm.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Input from '../../../Components/UI/Input/Input';
class ContactData extends Component {

    state = {
        orderform: {
                name :{
                    elementType: 'input',
                    elementConfig: {
                        type:'text',
                        placeholder:'Your Name'
                    },
                    value: '',
                    validation : {
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                street :{
                    elementType: 'input',
                    elementConfig: {
                        type:'text',
                        placeholder:'Street'
                    },
                    value: '',
                    validation : {
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                zipCode : {
                    elementType: 'input',
                    elementConfig: {
                        type:'text',
                        placeholder:'ZIP Code'
                    },
                    value: '',
                    validation : {
                        required : true,
                        minLength: 5,
                        maxLength : 5
                    },
                    valid : false,
                    touched : false
                },
                country :{
                    elementType: 'input',
                    elementConfig: {
                        type:'text',
                        placeholder:'Country'
                    },
                    value: '',
                    validation : {
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                email : {
                    elementType: 'input',
                    elementConfig: {
                        type:'email',
                        placeholder:'Your E-Mail'
                    },
                    value: '',
                    validation : {
                        required : true
                    },
                    valid : false,
                    touched : false
                },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options : [
                        {value: 'fastest', displayValue:'Fastest'},
                        {value: 'cheapest', displayValue:'Cheapest'}
                    ]
                },
                value: 'fastest',
                valid: true
            },
        },
        loading: false,
        formIsValid : false
    }
    checkValidity( value, rules) {
        let isValid = true;
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength) {
            isValid = value.length>=rules.minLength  && isValid;
        }
        if(rules.maxLength) {
            isValid = value.length<=rules.maxLength  && isValid;
        }
        return isValid;
    }
    inputChangedHandler = (event, inputIdentifier) => {
        // console.log(event.target.value);
        const updatedOrderForm = {
            ...this.state.orderform
        }
        const updatedOrderElement ={
            ...updatedOrderForm[inputIdentifier]
        }
        updatedOrderElement.value = event.target.value;
        updatedOrderElement.touched = true;
        console.log(updatedOrderElement);
        if(updatedOrderElement.elementType !== 'select')
        updatedOrderElement.valid = this.checkValidity(updatedOrderElement.value, updatedOrderElement.validation)
        // console.log(updatedOrderElement.valid)
        updatedOrderForm[inputIdentifier] = updatedOrderElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm)
        {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderform : updatedOrderForm, formIsValid: formIsValid});
    }
    orderHandler =(event) => {
        event.preventDefault();
         this.setState({loading : true})
         const formData = {}
         for(let formElementIdentifier in this.state.orderform)
         {
             formData[formElementIdentifier] = this.state.orderform[formElementIdentifier].value
         }

        // alert('You Continued');
        const order = {
            ingredients : this.props.ingredients ,
            price : this.props.price,
            orderData : formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false })
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false })
            }); 
    }
    render(){
        let formELementArray = [];
        for(let key in this.state.orderform )
        {
            formELementArray.push({
                id: key,
                config: this.state.orderform[key]
             })
        }
        let form = ( 
            <form onSubmit={this.orderHandler} >
                {formELementArray.map(formElement => (
                    <Input 
                    key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value} 
                        invalid={!formElement.config.valid}
                        touched = {formElement.config.touched}
                        shouldValidate={formElement.config.validation}
                        changed = {(event)=>this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid} >Order</Button>
            </form>
        );
        if(this.state.loading)
        form = <Spinner/>
        return(
            <div className={classes.ContactData} >
                <h4>Enter your contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;