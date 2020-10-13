import React from 'react'

class TripForm extends React.Component {

    state = {
        travel_date: "",
        destination: "",
        continent: "",
        form: false
    }

    changeHandler = (e) => {
        e.persist()
        this.setState(() => ({ [e.target.name]: e.target.value }))
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.tripSubmitHandler(this.state)
    }

    render() {
        return (
            <div id="trip-form">
                {this.state.form ? null :
                    <button onClick={() => { this.setState((previousState) => ({ form: !previousState.form })) }}>
                        Add a trip
                    </button>
                }
                {this.state.form ?
                    <form onSubmit={this.submitHandler}>
                        <input type="date" name="travel_date" value={this.state.travel_date} onChange={this.changeHandler} />
                        <input type="text" name="destination" placeholder="Destination" value={this.state.destination} onChange={this.changeHandler} />
                        <select name="continent" value={this.state.continent} onChange={this.changeHandler}>
                            <option>Choose a continent</option>
                            <option value="North America">North America</option>
                            <option value="South America">South America</option>
                            <option value="Europe">Europe</option>
                            <option value="Australia">Austrlia</option>
                            <option value="Africa">Africa</option>
                            <option value="Asia">Asia</option>
                            <option value="Antarctica">Antarctica</option>
                        </select>
                        <input type="submit" vakue="Submit Trip" />
                    </form>
                    : null
                }
            </div>
        )
    }
}

export default TripForm