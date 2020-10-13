import React from 'react'
import TripCard from '../Components/TripCard'
import { withRouter, NavLink } from 'react-router-dom'

function TripContainer(props) {

    const continentArrays = () => {
        let tripsArray = props.trips
        let nA = []
        let sA = []
        let eU = []
        let aS = []
        let aF = []
        let aU = []
        let aN = []
        for (let i = 0; i < tripsArray.length; i++) {
            switch (tripsArray[i].continent) {
                case ('North America'):
                    nA.push(tripsArray[i])
                    break
                case ('South America'):
                    sA.push(tripsArray[i])
                    break
                case ('Europe'):
                    eU.push(tripsArray[i])
                    break
                case ('Asia'):
                    aS.push(tripsArray[i])
                    break
                case ('Africa'):
                    aF.push(tripsArray[i])
                    break
                case ('Australia'):
                    aU.push(tripsArray[i])
                    break
                case ('Antarctica'):
                    aN.push(tripsArray[i])
                    break
                default:
                    break
            }
        }
        return { 'North America': nA, 'South America': sA, 'Europe': eU, 'Asia': aS, 'Africa': aF, 'Australia': aU, 'Antarctica': aN }
    }

    const mapTrips = (continentArray) => {
        return continentArray.map(trip => <NavLink to={`/trip/${trip.id}`}><TripCard trip={trip} /></NavLink>)
    }

    const setDOM = () => {
        let arrayOfContinents = []
        for (let continent in continentArrays()) {
            if (continentArrays()[continent].length > 0) {
                arrayOfContinents.push(
                    <div className="continent" id="NA">
                        <h2>{continent}</h2>
                        {mapTrips(continentArrays()[continent])}
                    </div>
                )
            }
        }
        return (
            <div id="trip-container">
                {arrayOfContinents}
            </div>
        )
    }

    return (
        setDOM()
    )
}

export default withRouter(TripContainer)