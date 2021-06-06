import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './BurgerIncredients.module.css';

class  BurgerIncredients extends Component {
    render(){
        let incredients =null;
        switch(this.props.type) {
             case('bread-bottom'):
                incredients = <div className={classes.BreadBottom}></div>;
                break;
            case('bread-top'):
                incredients =(
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
            case('meat'):
                incredients = <div className={classes.Meat}></div>;
                break;
            case('salad'):
                incredients = <div className={classes.Salad}></div>;
                break;
            case('bacon'):
                incredients = <div className={classes.Bacon}></div>;
                break;
            case('cheese'):
                incredients = <div className={classes.Cheese}></div>;
                break;
            default:
                incredients =null;
        }
        return incredients;
    }
}

BurgerIncredients.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIncredients;