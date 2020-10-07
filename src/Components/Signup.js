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
                    <form onSubmit={this.submitHandler}>
                        <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.changeHandler} />
                        <input type="text" name="password" placeholder="Password" value={this.state.password} onChange={this.changeHandler} />
                        <input type="text" name="password_confirmation" placeholder="Confirm Password" value={this.state.password_confirmation} onChange={this.changeHandler} />
                        <input type="submit" value="Sign Up" />
                    </form>
                </div>
            </div>
        )
    }
}

export default Signup