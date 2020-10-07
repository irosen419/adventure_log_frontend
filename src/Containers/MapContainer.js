import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Geocode from "react-geocode";

class MapContainer extends React.Component {

    state = {
        tripsArray: [],
        coordinatesArray: []
    }

    componentDidMount() {
        this.fetchTrips()
    }

    fetchTrips = () => {
        fetch('http://localhost:3000/api/v1/users/1/trips')
            .then(resp => resp.json())
            .then(trips => this.setState(() => ({ tripsArray: trips }), () => this.state.tripsArray.map(trip => this.geocode(trip.destination))))
    }

    geocode = (destination) => {
        Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);
        Geocode.setLanguage("en");
        Geocode.fromAddress(destination).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                this.setState((previousState) => ({ coordinatesArray: [...previousState.coordinatesArray, { destination: destination, latitude: lat, longitude: lng }] }))
            },
            error => {
                console.error(error);
            }
        );
    }

    mapStores = () => {
        return this.state.coordinatesArray.map(coord => <Marker key={coord.destination} position={{ lat: coord.latitude, lng: coord.longitude }} onClick={() => console.log("Clicked! ", coord.longitude)} />)
    }

    mapStyles = () => {
        return {
            height: '50%',
            width: '45%',
            margin: 'auto',
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
                >
                    {this.mapStores()}
                </Map >
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_KEY
})(MapContainer);
