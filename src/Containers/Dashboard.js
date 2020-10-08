import React from 'react'
import MapContainer from './MapContainer'
import TripForm from '../Components/TripForm'
import TripContainer from './TripContainer'


class Dashboard extends React.Component {

    state = {
        tripsArray: []
    }

    tripSubmitHandler = (trip) => {
        let tripObj = {
            user_id: this.props.user.id,
            destination: trip.destination,
            continent: trip.continent,
            travel_date: trip.travel_date
        }

        let options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-type': 'application/json',
                'Accepts': 'application/json',
            },
            body: JSON.stringify(tripObj)
        }

        fetch('http://localhost:3000/api/v1/trips', options)
            .then(resp => resp.json())
            .then(trip => this.setState((previousState) => ({ tripsArray: [...previousState.tripsArray, trip.trip] })))
    }

    render() {
        return (
            <div id="dashboard" >
                <MapContainer user={this.props.user} trips={this.state.tripsArray} />
                <TripForm tripSubmitHandler={this.tripSubmitHandler} />
                <TripContainer user={this.props.user} trips={this.state.tripsArray} />
            </div>
        )
    }
}

export default Dashboard