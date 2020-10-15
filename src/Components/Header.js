import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'

function Header(props) {

    const decideUserButton = () => {
        return window.location.pathname.split('/')[1] !== 'dashboard' &&
            localStorage.getItem("userId") !== props.user.id.toString() ?
            <NavLink to={`/dashboard/${localStorage.getItem('userId')}`}>Back to {localStorage.getItem("username")}'s dashboard</NavLink>
            : null
    }

    const logout = () => {
        localStorage.clear()
    }

    return (
        <div id='header'>
            <a href={`/dashboard/${props.user.id}`} onClick={() => {
                localStorage.setItem("userId", props.user.id)
                localStorage.setItem("username", props.user.username)
            }}>Dashboard</a>
            {decideUserButton()}
            {window.location.pathname.split('/')[1] === 'encounter' ? <NavLink to={`/trip/${localStorage.getItem('tripId')}`}>{localStorage.getItem('tripName')}</NavLink> : null}
            <a href='/login' onClick={logout}>Logout</a>
        </div>
    )
}

export default withRouter(Header)