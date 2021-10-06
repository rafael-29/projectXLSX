import React from 'react'
import {Link} from 'react-router-dom'




const Header = () => {



return(
<header>
    <h2 className="header-name">Project Xlsx</h2>
    <ul className="header-menu">
        <li className="head-li"><Link className="a-link" to="/">Create Table</Link></li>
        <li className="head-li"><Link className="a-link" to="/view">View Table</Link></li>
        <li className="head-li"><Link className="a-link" to="/settings">Settings</Link></li>
    </ul>
</header>
)
}

export default Header
