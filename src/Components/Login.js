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

    submitHandler = (e) => {
        e.preventDefault()
        this.props.loginHandler(this.state)
    }

    render() {
        return (
            <div id="login">
                <div id="login-form">
                    <form onSubmit={this.submitHandler}>
                        <label>Username:</label>
                        <input type="text" name="username" value={this.state.username} onChange={this.changeHandler} />
                        <label>Password:</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.changeHandler} />
                        <input className="submit" type="submit" value="Log In" />
                    </form>
                    <p>Not a user? <button id="signup" onClick={this.props.signUp}>Sign up!</button></p>
                </div>
            </div>
        )
    }
}

export default Login