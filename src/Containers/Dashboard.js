import React from 'react'
import MapContainer from './MapContainer'
import TripForm from '../Components/TripForm'


function Dashboard() {
    return (
        <div id="dashboard">
            <MapContainer />
            <TripForm />
        </div>
    )
}

export default Dashboard