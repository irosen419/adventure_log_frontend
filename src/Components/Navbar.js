import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as FcIcons from 'react-icons/fc'
import * as AiIcons from 'react-icons/ai'
import * as FiIcons from 'react-icons/fi'
import { IconContext } from 'react-icons'
import UserSearchForm from './UserSearchForm'

function Navbar(props) {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => {
        setSidebar(!sidebar)
    };

    const decideUserButton = () => {
        return window.location.pathname.split('/')[1] !== 'dashboard' &&
            localStorage.getItem("userId") !== props.user.id.toString() ?
            <li key={3} className='nav-text'>
                <Link to={`/dashboard/${localStorage.getItem('userId')}`}>
                    <span>Back to {localStorage.getItem("username")}'s dashboard</span>
                    <FaIcons.FaMapMarkedAlt />
                </Link>
            </li>
            : null
    }

    const decideTripNavButton = () => {
        return window.location.pathname.split('/')[1] === 'encounter' ?
            <li key={4} className='nav-text'>
                <Link to={`/trip/${localStorage.getItem('tripId')}`}>
                    <span>{localStorage.getItem('tripName')}</span>
                    <FaIcons.FaPlane />
                </Link>
            </li>
            : null
    }

    const logout = () => {
        localStorage.clear()
        props.logout()
    }

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='navbar'>
                    <Link to="#" className="menu-bars">
                        <FaIcons.FaBars onClick={() => showSidebar()} />
                    </Link>
                    <UserSearchForm />
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={() => showSidebar()}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        <li key={1} className='nav-text'>
                            <a href={`/dashboard/${props.user.id}`} onClick={() => {
                                localStorage.setItem("userId", props.user.id)
                                localStorage.setItem("username", props.user.username)
                            }}>
                                <span>Dashboard</span>
                                <FcIcons.FcGlobe />
                            </a>
                        </li>
                        <li key={2} className='nav-text'>
                            <Link to={'/hub'}>
                                <span>Hub</span>
                                <FaIcons.FaUserFriends />
                            </Link>
                        </li>
                        {decideUserButton()}
                        {decideTripNavButton()}
                        <li key={5} className='nav-text'>
                            <Link to={'/login'} onClick={logout}>
                                <span>Log out</span>
                                <FiIcons.FiLogOut />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </IconContext.Provider>
        </>
    )
}

export default withRouter(Navbar)