import { useState } from 'react';
import './style.css';

export const Header = ({ openSlider }) => {

    let [ btnText, setText ] = useState('add user');

  
    return(
        <nav className='nav'>
            <div className="nav-containsButton">
                <button className="nav-btn" onClick={openSlider}>add user</button>
            </div>
        </nav>
    );
}