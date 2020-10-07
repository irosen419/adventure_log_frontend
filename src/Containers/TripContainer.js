import React, { Component } from 'react'
import TripCard from '../Components/TripCard'

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

    componentDidUpdate(pP, pS) {
        if (pP.trips !== this.props.trips) {
            let nA = []
            let sA = []
            let eU = []
            let aS = []
            let aF = []
            let aU = []
            let aN = []
            for (let i = 0; i < this.props.trips.length; i++) {
                switch (this.props.trips[i].continent) {
                    case ('North America'):
                        nA.push(this.props.trips[i])
                        break
                    case ('South America'):
                        sA.push(this.props.trips[i])
                        break
                    case ('Europe'):
                        eU.push(this.props.trips[i])
                        break
                    case ('Asia'):
                        aS.push(this.props.trips[i])
                        break
                    case ('Africa'):
                        aF.push(this.props.trips[i])
                        break
                    case ('Australia'):
                        aU.push(this.props.trips[i])
                        break
                    case ('Antarctica'):
                        aN.push(this.props.trips[i])
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
    }

    mapTrips = (continentArray) => {
        return continentArray.map(trip => <TripCard trip={trip} />)
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

export default TripContainer