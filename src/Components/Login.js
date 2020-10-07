import React from 'react'

class Login extends React.Component {

    state = {
        username: "",
        password: ""
    }

    changeHandler = (e) => {
        e.persist()
        this.setState(() => ({ [e.target.name]: e.target.value }))
    }

    render() {
        return (
            <div id="welcome">
                <div id="login-form">
                    <form>
                        <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.changeHandler} />
                        <input type="text" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler} />
                        <input type="submit" value="Log In" />
                    </form>
                </div>
            </div>
        )
    }
}

export default Login