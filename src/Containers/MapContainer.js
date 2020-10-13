import React from 'react';
import { withRouter } from 'react-router-dom'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Geocode from "react-geocode";

class MapContainer extends React.Component {

    state = {
        coordinatesArray: []
    }

    componentDidUpdate(pP, pS) {
        if (pP.trips !== this.props.trips) {
            this.mapTrips(this.props.trips)
        }
    }

    geocode = (trip) => {
        Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);
        Geocode.setLanguage("en");
        return Geocode.fromAddress(trip.destination).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;

                return ({ id: trip.id, destination: trip.destination, latitude: lat, longitude: lng })
            },
            error => {
                console.error(error);
            }
        );
    }

    mapTrips = (tripsArray) => {
        for (const trip of tripsArray) {
            this.geocode(trip).then((coords) => this.setState((previousState) => ({ coordinatesArray: [...previousState.coordinatesArray, coords] })))
        }
    }


    makeMarkers = () => {
        return this.state.coordinatesArray.map(coord => <Marker name={coord.destination} title={coord.destination} id={coord.id} position={{ lat: coord.latitude, lng: coord.longitude }} onClick={() => this.props.history.push(`/trip/${coord.id}`)} />)
    }

    mapStyles = () => {
        return {
            height: '50%',
            width: '45%',
            margin: 'auto',
            marginTop: '25px',
        };
    }

    render() {
        return (
            <div id="trip-map">
                <Map
                    google={this.props.google}
                    zoom={1.25}
                    style={this.mapStyles()}
                    initialCenter={{ lat: 20, lng: 12 }}
                    mapType={window.google.maps.MapTypeId.SATELLITE}
                    onClick={this.onMapClicked}
                >
                    {this.state.coordinatesArray.length === 0 ? this.mapTrips(this.props.trips) : this.makeMarkers()}
                </Map >
            </div >
        );
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_KEY
})(withRouter(MapContainer));
