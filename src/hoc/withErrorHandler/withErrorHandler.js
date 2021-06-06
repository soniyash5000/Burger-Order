import React, { Component } from 'react';
import Modal from '../../Components/UI/Modal/Modal';
import Aux from '../Aux/Aux';
const withErrorHandler = (WrappedComponent,axios) => {
    return class extends Component{


        state = {
            error : null
        }

        UNSAFE_componentWillMount() {
           this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req;
            })
           this.reqInterceptor =  axios.interceptors.response.use(res => res, error => {
                this.setState ({error: error})
            }) 
        }

        componentWillUnmount() {
            console.log('will unmount ', this.reqInterceptor , this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error : null})
        }

        render(){
            return (
                <Aux>
                    <Modal 
                        show = {this.state.error}
                        modalClosed={this.errorConfirmedHandler} >
                            {/* {this.state.error ? console.log(this.state.error.message) : null} */}
                        {this.state.error ? 'Network Error': null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
}

export default withErrorHandler;