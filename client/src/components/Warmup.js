import React from 'react';
import '../stylesheets/Warmup.css';

function Warmup(props) {


    function exitPage() {
        props.setPage('home');
    }

    return (
        <div className='Warmup'>

            <div className='header'>
                <div className='exit'>
                    <button className='stackedBtn' onClick={exitPage}>
                        <i className="fa-solid fa-arrow-left"></i>
                        <span>Exit</span>
                    </button>
                </div>
                <div className='title'>
                    <h1 className='bigText'>Warmup</h1>
                </div>
                <div className='placeholder'></div>
            </div>

            <div className="buttons">
            <button className="modeButton disabled">
                    <img src={props.images[0]} alt="" />
                </button>
                <button className="modeButton disabled">
                    <img src={props.images[1]} alt="" />
                </button>
                <button className="modeButton disabled">
                    <img src={props.images[2]} alt="" />
                </button>
                <button className="modeButton disabled">
                    <img src={props.images[3]} alt="" />
                </button>
            </div>
        </div>
    )
}

// FOR ADDING FLIPS TO LISTS
/*

function formatFlips(flips) {
    const arr = flips.split('\n');
    return arr.map(el => {
        let temp = el.split('');
        temp.unshift('"');
        temp.push('"');
        return temp.join('');
    }).join(', ');
}

*/

export default Warmup;