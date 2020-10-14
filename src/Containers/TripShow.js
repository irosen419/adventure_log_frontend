import React from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Geocode from "react-geocode";
import SearchForm from '../Components/SearchForm'
import EncounterForm from '../Components/EncounterForm'
import { NavLink, withRouter } from 'react-router-dom'

class TripShow extends React.Component {

    state = {
        trip: "",
        tripLocation: "",
        encounterArray: [],
        animalScientificName: "",
        animalCommonName: "",
        animalId: ""
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
            .then(tripObj => this.setState(() => ({ trip: tripObj.trip }), () => this.geocode(this.state.trip)))


        fetch(`http://localhost:3000/api/v1/trips/${tripId}/encounters`, options)
            .then(resp => resp.json())
            .then(encounters => this.setState(() => ({ encounterArray: encounters })))
    }

    encounterAnimalHandler = (animal) => {
        this.setState(() => ({
            animalScientificName: animal.scientific_name,
            animalCommonName: animal.common_name,
            animalId: animal.id
        }))
    }

    encounterNotesHandler = (note) => {
        let formData = new FormData()

        // console.log(this.state.animalId)

        formData.append('encounter[trip_id]', this.state.trip.id)
        formData.append('encounter[animal_id]', this.state.animalId)
        formData.append('encounter[time_of_day]', note.time_of_day)
        formData.append('encounter[weather_conditions]', note.weather_conditions)
        formData.append('encounter[notes]', note.notes)
        formData.append('encounter[photo]', note.photo)
        //console.log(hello)

        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: formData
        }

        fetch('http://localhost:3000/api/v1/encounters', options)
            .then(resp => resp.json())
            .then(encounter => this.setState((previousState) => ({ encounterArray: [...previousState.encounterArray, encounter.encounter] })))
        //encounter => this.setState((previousState) => ({ encounterArray: [...previousState.encounterArray, encounter.encounter] }))
    }

    mapEncounters = () => {
        return this.state.encounterArray.map(encounter => {
            return (<NavLink to={`/encounter/${encounter.id}`}><h1 onClick={() => {
                localStorage.setItem("sci_name", encounter.animal_scientific_name)
                localStorage.setItem("common_name", encounter.animal_common_name)
                localStorage.setItem("tripId", this.state.trip.id)
                localStorage.setItem("tripName", this.state.trip.destination)
            }}>{encounter.animal_common_name}</h1></NavLink>)
        })
    }

    deleteTrip = () => {
        const tripId = window.location.pathname.split('/')[2]
        const options = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-type': 'application/json',
                'Accepts': 'application/json',
            }
        }

        fetch(`http://localhost:3000/api/v1/trips/${tripId}`, options)
            .then(resp => resp.json())
            .then((data) => {
                if (data.success) {
                    this.props.history.push('/dashboard')
                } else {
                    console.log(data.error)
                }
            })
    }

    geocode = (trip) => {
        Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);
        Geocode.setLanguage("en");
        return Geocode.fromAddress(trip.destination).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                this.setState(() => ({ tripLocation: { id: trip.id, destination: trip.destination, latitude: lat, longitude: lng } }))

            },
            error => {
                console.error(error);
            }
        );
    }

    mapStyles = () => {
        return {
            height: '100%',
            width: '100%',
            marginLeft: '7.5%',
            marginRight: '0',
            marginTop: '25px',
        };
    }

    render() {
        return (
            <div id="trip">
                <SearchForm encounterAnimalHandler={this.encounterAnimalHandler} />
                <div id='flex'>
                    <div id='encounters'>
                        <EncounterForm encounterNotesHandler={this.encounterNotesHandler} />
                        {this.state.trip ? <h1 id="trip-show">{this.state.trip.destination} {this.state.trip.date ? `- ${this.state.trip.date}` : null}</h1> : null}
                        {this.state.encounterArray ? this.mapEncounters() : <h3>Loading this trip's encounters...</h3>}
                        <button onClick={this.deleteTrip}>Delete Trip</button>
                    </div>
                    <div id='location-map'>
                        {this.state.tripLocation ?
                            <Map
                                google={this.props.google}
                                zoom={4.5}
                                style={this.mapStyles()}
                                initialCenter={{ lat: this.state.tripLocation.latitude, lng: this.state.tripLocation.longitude }}
                                mapType={window.google.maps.MapTypeId.SATELLITE}
                                // mapOptions={{ zoomControl: false }}
                                // disableDefaultUI={true}
                                onClick={this.onMapClicked}
                            >
                                <Marker name={this.state.tripLocation.destination} title={this.state.tripLocation.destination} id={this.state.tripLocation.id} position={{ lat: this.state.tripLocation.latitude, lng: this.state.tripLocation.longitude }} />
                            </Map >
                            : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_KEY
})(withRouter(TripShow))