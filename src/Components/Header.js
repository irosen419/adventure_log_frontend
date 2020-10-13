import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'

function Header() {
    return (
        <div id='header'>
            <NavLink to='/dashboard'>Dashboard</NavLink>
            {window.location.pathname.split('/')[1] === 'encounter' ? <NavLink to={`/trip/${localStorage.getItem('tripId')}`}>{localStorage.getItem('tripName')}</NavLink> : null}
        </div>
    )
}

export default withRouter(Header)