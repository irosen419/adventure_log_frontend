import React from 'react'

class TripForm extends React.Component {

    state = {
        date: "",
        location: "",
        continent: ""
    }

    changeHandler = (e) => {
        e.persist()
        this.setState(() => ({ [e.target.name]: e.target.value }))
    }

    render() {
        return (
            <form id="trip-form">
                <input type="date" name="date" value={this.state.date} onChange={this.changeHandler} />
                <input type="text" name="location" value={this.state.location} onChange={this.changeHandler} />
                <select value={this.state.continent} onChange={this.changeHandler}>
                    <option>Choose a continent</option>
                    <option>North America</option>
                    <option>South America</option>
                    <option>Europe</option>
                    <option>Austrlia</option>
                    <option>Africa</option>
                    <option>Asia</option>
                    <option>Antarctica</option>
                </select>
                <input type="submit" vakue="Submit Trip" />
            </form>
        )
    }
}

export default TripForm