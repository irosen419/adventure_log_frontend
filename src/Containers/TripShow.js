import React from 'react'
import SearchForm from '../Components/SearchForm'

class TripShow extends React.Component {

    state = {
        trip: {}
    }

    componentDidMount() {
        const tripId = window.location.pathname.split('/')[2]
        const token = localStorage.getItem("token")

        const options = {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        }

        fetch(`http://localhost:3000/api/v1/trips/${tripId}`, options)
            .then(resp => resp.json())
            .then(tripObj => this.setState(() => ({ trip: tripObj.trip })))
    }

    render() {
        return (
            <div id="trip">
                <SearchForm />
                <h1 id="trip-show">{this.state.trip.destination} - {this.state.trip.travel_date}</h1>
            </div>
        )
    }
}

export default TripShow