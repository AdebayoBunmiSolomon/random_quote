import React, { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRandom } from '@fortawesome/free-solid-svg-icons';
import './Components.css';

function Header() {
    const headerColor = ['Purple', 'Violet', 'Crimson', 'Indigo', 'MediumSpringGreen', 'Orange', 'CornFlowerBlue', 'NavyBlue'];
    const txtHeader = useRef(null);
    let randomHeaderColor;
    randomHeaderColor = headerColor[Math.floor(Math.random() * headerColor.length)];

    useEffect(() => {
        const timer = setInterval(() => {
            txtHeader.current.style.color = randomHeaderColor;
        }, 50)
        return () => clearInterval(timer);
    })

    return (
        <div>
            <div className='container-fluid mb-0'>
                <h1 ref={txtHeader} className='txtHeader'>
                    Random Quotes Generator <FontAwesomeIcon icon={faRandom} />
                </h1>
            </div>
        </div>
    )
}

export default Header
