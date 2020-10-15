import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'

function Header(props) {

    const decideUserButton = () => {
        return window.location.pathname.split('/')[1] !== 'dashboard' &&
            window.location.pathname.split('/')[2] !== props.user.id ?
            <NavLink to={`/dashboard/${localStorage.getItem('userId')}`}>Back to other User</NavLink>
            : null
    }

    return (
        <div id='header'>
            <a href={`/dashboard/${props.user.id}`} onClick={() => {
                localStorage.setItem("userId", props.user.id)
                localStorage.setItem("username", props.user.username)
            }}>Dashboard</a>
            {decideUserButton()}
            {window.location.pathname.split('/')[1] === 'encounter' ? <NavLink to={`/trip/${localStorage.getItem('tripId')}`}>{localStorage.getItem('tripName')}</NavLink> : null}
        </div>
    )
}

export default withRouter(Header)