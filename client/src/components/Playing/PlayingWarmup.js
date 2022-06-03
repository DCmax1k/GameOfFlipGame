import React, {Component} from 'react';

class PlayingWarmup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flips: props.flips,
            mode: props.mode,
            flipsUsed: [],
            currentFlip: '',
        }
        this.pickFlip = this.pickFlip.bind(this);
    }
    componentDidMount() {
        this.resetGame();
    }

    pickFlip() {
        if (this.state.flips.length === 0) {
            return this.resetGame();
        }
        let flip = this.state.flips[Math.floor(Math.random() * this.state.flips.length)];
        let flipsUsed = [...this.state.flipsUsed, flip];
        const flips = this.state.flips.filter(f => f !== flip);
        this.setState({flipsUsed, currentFlip: flip, flips});
        return flip;
    }

    resetGame() {
        let flips = [...this.state.flipsUsed, ...this.state.flips];
        let flip = flips[Math.floor(Math.random() * flips.length)];
        flips = flips.filter(f => f !== flip);
        this.setState({
            flipsUsed: [flip],
            flips: flips,
            currentFlip: flip,
            mode: this.props.mode,
        })
    }

    render() {
        return (
            <div className='PlayingWarmup'>
                <div className='flip'>
                    {this.state.currentFlip}
                </div>
                <div className="showMode">
                    <img className={this.props.mode} src={this.props.modeURL} alt='showing mode' />
                </div>
                <div className='buttons'>
                    <button className='button' onClick={() => this.pickFlip()}>Next</button>
                </div>
            </div>
        )
    }
}

export default PlayingWarmup;