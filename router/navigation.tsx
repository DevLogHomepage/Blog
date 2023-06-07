import { Link } from 'react-router-dom';
import './navigation.css'
import React from 'react';

function Navigation(){
    return(
        <nav className='nav'>
        <div className="nav-selection">
            <Link reloadDocument={true} className="nav-link" to="/">MAIN</Link>
        </div>
        <div className="nav-selection">
            <Link reloadDocument={true} className="nav-link" to="/tech">TECH</Link>
        </div>
        <div className="nav-selection">
            <Link reloadDocument={true} className="nav-link" to="/tech">PROJECT</Link>
        </div>
        <div className="nav-selection">
            <Link reloadDocument={true} className="nav-link" to="/tech">ABOUT ME</Link>
        </div>
    </nav>
    )
}

export default Navigation;