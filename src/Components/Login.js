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
            <div id="welcome">
                <div id="login-form">
                    <form onSubmit={this.submitHandler}>
                        <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.changeHandler} />
                        <input type="text" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler} />
                        <input type="submit" value="Log In" />
                    </form>
                    <p>Not a user? <button onClick={this.props.signUp}>Sign up!</button></p>
                </div>
            </div>
        )
    }
}

export default Login