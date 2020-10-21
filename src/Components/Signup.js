import React from 'react'

class Signup extends React.Component {

    state = {
        username: "",
        password: "",
        password_confirmation: ""
    }

    changeHandler = (e) => {
        e.persist()
        this.setState(() => ({ [e.target.name]: e.target.value }))
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.signupHandler(this.state)
    }

    render() {
        return (
            <div id="welcome">
                <div id="signup-form">
                    <span onClick={this.props.signUp}>x</span>
                    <form onSubmit={this.submitHandler}>
                        <label>Username:</label>
                        <input type="text" name="username" value={this.state.username} onChange={this.changeHandler} />
                        <label>Password:</label>
                        <input type="password" name="password" value={this.state.password} onChange={this.changeHandler} />
                        <label>Confirm Password:</label>
                        <input type="password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.changeHandler} />
                        <input className="submit" type="submit" value="Sign Up" />
                    </form>
                </div>
            </div>
        )
    }
}

export default Signup