import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Geocode from "react-geocode";
import EncounterCard from '../Components/EncounterCard';

class Hub extends React.Component {

    state = {
        mapOrList: true,
        allTripsArray: [],
        coordinatesArray: [],
        markersArray: [],
        filterType: "All"
    }

    componentDidUpdate(pP, pS) {
        if (pS.allTripsArray !== this.state.allTripsArray) {
            this.mapTrips(this.state.allTripsArray)
        }
    }

    componentDidMount() {
        let options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-type': 'application/json',
                'Accepts': 'application/json',
            }
        }
        fetch(`http://localhost:3000/api/v1/trips`, options)
            .then(resp => resp.json())
            .then(trips => this.setState(() => ({ allTripsArray: trips.trips })))
    }

    renderHub = () => {
        return this.state.mapOrList ?
            <div id="map">
                <Map
                    google={this.props.google}
                    zoom={1.5}
                    style={this.mapStyles()}
                    initialCenter={{ lat: 20, lng: 12 }}
                    mapType={window.google.maps.MapTypeId.SATELLITE}
                >
                    {this.state.markersArray.length > 0 ? this.state.markersArray : null}
                </Map >
            </div>
            :
            <div id="list">
                {this.listEncounters()}
            </div>
    }

    listEncounters = () => {
        const encounters = this.state.allTripsArray.map(trip => trip.my_encounters).flat()
        return encounters.map(encounter =>
            <Link to={`/encounter/${encounter.id}`} onClick={() => {
                localStorage.setItem("sci_name", encounter.animal_scientific_name)
                localStorage.setItem("common_name", encounter.animal_common_name)
                localStorage.setItem("userId", encounter.user_id)
                localStorage.setItem("tripId", encounter.trip_id)
                localStorage.setItem("username", encounter.username)
                localStorage.setItem("tripName", encounter.destination)
            }}>
                <EncounterCard encounter={encounter} />
            </Link>
        )
    }

    mapTrips = (tripsArray) => {
        for (const trip of tripsArray) {
            this.geocode(trip).then((coords) => this.setState((previousState) => ({ coordinatesArray: [...previousState.coordinatesArray, coords] }), () => this.makeMarkers()))
        }
    }

    geocode = (trip) => {
        Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);
        Geocode.setLanguage("en");
        return Geocode.fromAddress(trip.destination).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;

                return ({ id: trip.id, user_id: trip.user_id, username: trip.my_user, destination: trip.destination, latitude: lat, longitude: lng })
            },
            error => {
                console.error(error);
            }
        );
    }

    makeMarkers = () => {
        if (this.state.markersArray.length > 0) {
            return
        } else {
            let followingsTripsIds = this.props.followings.map(following => following.id)
            let coordinates = []
            for (const coord of this.state.coordinatesArray) {
                if (coord.user_id === this.props.user.id) {
                    coordinates.push(
                        <Marker
                            key={this.state.coordinatesArray.indexOf(coord)}
                            name={coord.destination}
                            title={`${coord.destination}\n\n${coord.username}`}
                            id={coord.id}
                            position={{ lat: coord.latitude, lng: coord.longitude }}
                            onClick={() => {
                                localStorage.setItem("userId", coord.user_id)
                                this.props.history.push(`/trip/${coord.id}`)
                            }}
                            icon={{ url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" }}
                        />
                    )
                } else if (followingsTripsIds.includes(coord.user_id)) {
                    coordinates.push(
                        <Marker
                            key={this.state.coordinatesArray.indexOf(coord)}
                            name={coord.destination}
                            title={`${coord.destination}\n\n${coord.username}`}
                            id={coord.id}
                            position={{ lat: coord.latitude, lng: coord.longitude }}
                            onClick={() => {
                                localStorage.setItem("userId", coord.user_id)
                                localStorage.setItem("username", coord.username)
                                this.props.history.push(`/trip/${coord.id}`)
                            }}
                            icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}
                        />
                    )
                } else {
                    coordinates.push(
                        <Marker
                            key={this.state.coordinatesArray.indexOf(coord)}
                            name={coord.destination}
                            title={`${coord.destination}\n\n${coord.username}`}
                            id={coord.id}
                            position={{ lat: coord.latitude, lng: coord.longitude }}
                            onClick={() => {
                                localStorage.setItem("userId", coord.user_id)
                                this.props.history.push(`/trip/${coord.id}`)
                            }}
                            icon={{ url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png" }}
                        />
                    )
                }
            }
            if (coordinates.length === this.state.allTripsArray.length) {
                this.setState(() => ({ markersArray: coordinates }))
            }
        }
    }

    filterTripsandEncounters = () => {
        if (this.state.mapOrList) {

        } else {

        }
    }

    changeHandler = (e) => {
        e.persist()
        this.setState(() => ({ filterType: e.target.value }))
    }

    mapStyles = () => {
        return {
            height: '70%',
            width: '65%',
            margin: 'auto',
            marginTop: '4rem',
        };
    }

    render() {
        return (
            <div id='hub' >
                { this.state.allTripsArray ?
                    <>
                        <button onClick={() => this.setState((previousState) => ({ mapOrList: !previousState.mapOrList }))}>
                            {this.state.mapOrList ? 'List View' : 'Map View'}
                        </button>
                        <select onChange={this.changeHandler}>
                            <option>All trips</option>
                            <option>Friends' trips</option>
                            <option>My trips</option>
                        </select>
                    </>
                    : null
                }
                { this.state.allTripsArray ? this.renderHub() : null}
            </div >
        )
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_KEY
})(withRouter(Hub))