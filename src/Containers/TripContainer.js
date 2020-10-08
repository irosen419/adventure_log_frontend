import React from 'react'
import TripCard from '../Components/TripCard'
import { withRouter, NavLink } from 'react-router-dom'

class TripContainer extends React.Component {

    state = {
        northAmerica: [],
        southAmerica: [],
        europe: [],
        asia: [],
        australia: [],
        africa: [],
        antarctica: []
    }

    componentDidMount() {
        let tripsArray = this.props.user.my_trips
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
                    console.log('nothing')
            }
        }
        this.setState(() => ({
            northAmerica: nA,
            southAmerica: sA,
            europe: eU,
            asia: aS,
            australia: aU,
            africa: aF,
            antarctica: aN
        }))
    }

    mapTrips = (continentArray) => {
        return continentArray.map(trip => <NavLink to={`/trip/${trip.id}`}><TripCard trip={trip} /></NavLink>)
    }

    render() {
        return (
            <div id="trip-container">
                {this.state.northAmerica.length > 0 ?
                    <div className="continent" id="NA">
                        <h2>North America</h2>
                        {this.mapTrips(this.state.northAmerica)}
                    </div> :
                    null
                }
                {this.state.southAmerica.length > 0 ?
                    <div className="continent" id="SA">
                        <h2>South America</h2>
                        {this.mapTrips(this.state.southAmerica)}
                    </div> :
                    null
                }
                {this.state.europe.length > 0 ?
                    <div className="continent" id="EU">
                        <h2>Europe</h2>
                        {this.mapTrips(this.state.europe)}
                    </div> :
                    null
                }
                {this.state.asia.length > 0 ?
                    <div className="continent" id="AS">
                        <h2>Asia</h2>
                        {this.mapTrips(this.state.asia)}
                    </div> :
                    null
                }
                {this.state.australia.length > 0 ?
                    <div className="continent" id="AU">
                        <h2>Australia</h2>
                        {this.mapTrips(this.state.australia)}
                    </div> :
                    null
                }
                {this.state.africa.length > 0 ?
                    <div className="continent" id="AF">
                        <h2>Africa</h2>
                        {this.mapTrips(this.state.africa)}
                    </div> :
                    null
                }
                {this.state.antarctica.length > 0 ?
                    <div className="continent" id="AN">
                        <h2>Antarctica</h2>
                        {this.mapTrips(this.state.antarctica)}
                    </div> :
                    null
                }
            </div>
        )
    }
}

export default withRouter(TripContainer)