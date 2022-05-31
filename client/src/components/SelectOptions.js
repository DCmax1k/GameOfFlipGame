import React, {useState} from 'react';
import '../stylesheets/SelectOptions.css';

function SelectOptions(props) {

    const [diffMenuActive, setDiffMenuActive] = useState(false);

    function goBack() {
        props.setPage('selectMode');
    }

    function setCategory(category) {
        toggleDiffMenu();
        props.setCategory(category);
    }
    function setDifficulty(difficulty) {
        props.setDifficulty(difficulty);
    }

    function toggleDiffMenu() {
        setDiffMenuActive(!diffMenuActive);
    }

    return (

        <div className='SelectOptions'>

            <div className={`selectDiff ${diffMenuActive?'active':''}`}>
                <button onClick={toggleDiffMenu} className='exitMenu'>x</button>
                <div className='bigText'>How good <br /> really are you?</div>
                <div className='buttons'>
                    <button className='button' onClick={() => {setDifficulty('easy')}}>Easy</button>
                    <button className='button' onClick={() => {setDifficulty('medium')}}>Medium</button>
                    <button className='button' onClick={() => {setDifficulty('hard')}}>Hard</button>
                    <button className='button' onClick={() => {setDifficulty('pro')}} >Pro</button>
                </div>
            </div>

            <div className='logo'>
                <img src='/images/logo.png' alt='logo' />
            </div>
            <div className='bigText'>Select <br /> Setting</div>

            <div className="buttons">
                <button className="modeButton" onClick={() => {setCategory('trampoline')}}>
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
            <button className="button back" onClick={goBack}>Back</button>
        </div>
    )
}

export default SelectOptions;