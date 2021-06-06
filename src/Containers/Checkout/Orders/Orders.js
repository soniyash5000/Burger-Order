import { Component } from "react";
import Order from '../../../Components/Order/Order';
import axios from '../../../axios-orders';
import withErrorHanler from '../../../hoc/withErrorHandler/withErrorHandler';
class Orders extends Component {
    state = {
        loading : true,
        orders:[]
    }
    componentDidMount(){
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for(let key in res.data ){
                    fetchedOrders.push({
                        ...res.data[key],
                        id:key
                    })
                }
                this.setState({loading: false , orders: fetchedOrders})
            })
            .catch(err => {
                this.setState({loading: false})
            })
    }
    render(){
        return(
            <div>
                {this.state.orders.map(order => (
                    <Order key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                    />
        ))}
            </div>
        );
    }
}

export default withErrorHanler(Orders,axios);