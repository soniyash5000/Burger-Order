import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad : 5 , 
    cheese: 10 , 
    bacon : 15 , 
    meat : 20
}


class BurgerBuilder extends Component {
    state = {
        ingredients : null,
        totalPrice  : 30,
        purchasable : false,
        purchasing : false,
        loading : false

    }

    componentDidMount() {
        axios.get('https://my-burger-e3730-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
    }

    updatepurchasable = (ingredients) => {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum,el)=> {
                return sum+el;                 
           },0)
        this.setState({purchasable: sum>0});
    } 


    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1;
        const upgradedIngredients = {
            ...this.state.ingredients
        }
        upgradedIngredients[type] = newCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice : newPrice, ingredients : upgradedIngredients});
        this.updatepurchasable(upgradedIngredients);
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <=0)
        {
            return;
        }
        const newCount = oldCount - 1;
        const upgradedIngredients = {
            ...this.state.ingredients
        }
        upgradedIngredients[type] = newCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice : newPrice, ingredients : upgradedIngredients});
        this.updatepurchasable(upgradedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
       
        const queryParams = [];
        for(let i in this.state.ingredients)
        {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString =queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' +  queryString
        });
    }

   render() {

    const disabledInfo = {
        ...this.state.ingredients
    };
    for(let key in disabledInfo)
    {
        disabledInfo[key] = disabledInfo[key] <=0
    }
    let ordersummary = null;
    let burger = <Spinner /> 
    if(this.state.ingredients)
    {
        burger = (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    purchasable = {this.state.purchasable}
                    ordered = {this.purchaseHandler}
                    price = {this.state.totalPrice}/>
            </Aux>
        )
        ordersummary = <OrderSummary 
        ingredients = {this.state.ingredients}
        cancelled = {this.purchaseCancelHandler}
        price = {this.state.totalPrice}
        continued= {this.purchaseContinueHandler}/>
        if(this.state.loading)
        ordersummary = <Spinner/>
    }
   
        

        return(
            <Aux>
                <Modal show= {this.state.purchasing} modalClosed= {this.purchaseCancelHandler}>
                    {ordersummary}
                </Modal>
                {burger}
                
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder,axios);
