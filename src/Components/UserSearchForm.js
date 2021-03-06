import React from 'react'
import { withRouter } from 'react-router-dom'

class UserSearchForm extends React.Component {

    state = {
        search: [],
        usersArray: [],
        suggestions: []
    }

    componentDidMount() {
        this.fetchUsers()
    }

    fetchUsers = () => {
        const configObj = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }
        }

        fetch('http://localhost:3000/api/v1/users', configObj)
            .then(resp => resp.json())
            .then(users => this.setState(() => ({ usersArray: users.users })))
    }

    changeHandler = (e) => {
        e.persist()
        this.setState(() => ({ search: e.target.value }), () => {
            let listOfUsers = this.state.usersArray
            let suggestions = []
            if (this.state.search.length > 0) {
                suggestions = listOfUsers.filter(user => user.username.toLowerCase().includes(this.state.search.toLowerCase()))
            }
            this.setState(() => ({ suggestions: suggestions }))
        })
    }


    mapUsers = () => {
        return this.state.suggestions.map(user => <a key={user.id} href={`/dashboard/${user.id}`}><li className="user-search" onClick={() => {
            localStorage.setItem("username", user.username)
            localStorage.setItem("userId", user.id)
        }}>{user.username}</li></a>)
    }

    renderSuggestions = () => {
        const { suggestions } = this.state
        if (suggestions.length === 0) {
            return null
        } else {
            return (
                <ul>
                    {this.mapUsers()}
                </ul>
            )
        }
    }

    render() {
        return (
            <form className="search-bar">
                <input type="text" name="search" placeholder="Search..." value={this.state.search} onChange={this.changeHandler} />
                {this.renderSuggestions()}
            </form>
        )
    }
}

export default withRouter(UserSearchForm)