import React, {useState} from 'react';
import '../stylesheets/Warmup.css';
import PlayingWarmup from './Playing/PlayingWarmup';

import gameData from './gameDataFuture.json';

function Warmup(props) {


    function exitPage() {
        props.setPage('home');
    }

    const [mode, setMode] = useState(''); //  tramp, super, ground, air
    const [flips, setFlips] = useState([]);
    const [modeURL, setModeURL] = useState('');


    function start(mode) {
        setMode(mode);
        switch (mode) {
            case 'tramp':
                let { trampoline } = gameData.categories;
                let trampFlips = [...trampoline.easy, ...trampoline.medium, ...trampoline.hard, ...trampoline.pro];
                setFlips(trampFlips);
                setModeURL('images/gardenTramp.png');
                break;
            case 'super':
                let { superTramp } = gameData.categories;
                let superFlips = [...superTramp.easy, ...superTramp.medium, ...superTramp.hard, ...superTramp.pro];
                setFlips(superFlips);
                setModeURL('images/superTramp.png');
                break;
            case 'ground':
                let { ground } = gameData.categories;
                let groundFlips = [...ground.easy, ...ground.medium, ...ground.hard, ...ground.pro];
                setFlips(groundFlips);
                setModeURL('images/ground.png');
                break;
            case 'air':
                let { airTrack } = gameData.categories;
                let airFlips = [...airTrack.easy, ...airTrack.medium, ...airTrack.hard, ...airTrack.pro];
                setFlips(airFlips);
                setModeURL('images/airTrack.png');
                break;
            default:
                break;
        }
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

            { !mode && (
            <div className="buttons">
                <button className="modeButton" onClick={() => {start('tramp')}}>
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
            )}
            { mode && (
                <PlayingWarmup
                    flips={flips}
                    mode={mode}
                    modeURL={modeURL}
                />
            )}


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