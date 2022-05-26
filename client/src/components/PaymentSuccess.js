import React from 'react';

class PaymentSuccess extends React.Component {
    constructor() {
        super();
        this.state = {
            seconds: 10,
        }
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.tick();
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    redirect = () => {
        window.location.href = '/game';
    }

    tick() {
        if (this.state.seconds > 0) {
            this.setState({
                seconds: this.state.seconds - 1
            })
        } else {
            this.redirect();
        }
    }

    render() {
       return (
            <div className='PaymentSuccess'>
                <div>Your payment has been successful!</div>
                <div>You will be redirected to the game page in {this.state.seconds}</div>
                <div>If you are not redirected, please click <button onClick={this.redirect} className='button'>here</button></div>
            </div>
        ) 
    }
    
}

export default PaymentSuccess;