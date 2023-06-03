import { Link } from "react-router-dom";
import * as React from "react"
import './navigation.css'

function Navigation(){
    return(
        <nav className='nav'>
            <div className="nav-selection">
                <Link className="nav-link" to="/">MAIN</Link>
            </div>
            <div className="nav-selection">
                <Link className="nav-link" to="/tech">TECH</Link>
            </div>
            <div className="nav-selection">
                <Link className="nav-link" to="/project">PROJECT</Link>
            </div>
            <div className="nav-selection">
                <Link className="nav-link" to="/about">ABOUT ME</Link>
            </div>
        </nav>
    )
}

export default Navigation;