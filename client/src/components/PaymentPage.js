import React from 'react';
import sendData from './sendData';
import StripePublicKey from './stripe/StripePublicKey';
import '../stylesheets/PaymentPage.css';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './stripe/CheckoutForm';

const stripePromise = loadStripe(StripePublicKey.testKey);

class PaymentPage extends React.Component {
    constructor() {
        super();
        this.state = {
            user: {},
            options: {},
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount() {
        const checkLogin = await sendData('/checklogin', {});
        //const checkLogin = {status: 'success', redirect: 'payment', user: {username: 'test'}}; // TESTING PURPOSES ONLY

        if (checkLogin.status !== 'success') {
            window.location.href = `/`;
        } else if (checkLogin.redirect === 'game') {
            window.location.href = `/game`;
        }

        const response = await fetch('/stripesecret');
        const {client_secret: clientSecret} = await response.json();
        //const {client_secret: clientSecret} = {client_secret: 'pi_3L3ldqAmT1yCSYyC12BnMsKX_secret_1G4d6VOVQWu8kZOngCyYOorzW'}; // TESTING PURPOSES ONLY

        this.setState({options: {clientSecret: clientSecret, appearance: {theme: 'stripe'}}, user: checkLogin.user});
    }
    render() {
        return (
            <div className='PaymentPage'>
                <div className='logo'>
                    <img src='/images/logo.png' alt='logo' />
                </div>
                <h1 className='bigText'>Payment</h1>
                {this.state.options.clientSecret && this.state.user && (
                <Elements options={this.state.options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
                )}
            </div>
        )
    }
}

export default PaymentPage;