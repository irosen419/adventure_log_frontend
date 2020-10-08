import React from 'react'
import MapContainer from './MapContainer'
import TripForm from '../Components/TripForm'
import TripContainer from './TripContainer'


function Dashboard(props) {

    const tripSubmitHandler = (trip) => {
        let tripObj = {
            user_id: props.user.id,
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
    }

    return (
        <div id="dashboard" >
            <MapContainer user={props.user} />
            <TripForm tripSubmitHandler={tripSubmitHandler} />
            <TripContainer user={props.user} />
        </div>
    )
}

export default Dashboard