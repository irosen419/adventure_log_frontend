import React from 'react'
import SearchForm from '../Components/SearchForm'
import EncounterForm from '../Components/EncounterForm'
import { NavLink, withRouter } from 'react-router-dom'

class TripShow extends React.Component {

    state = {
        trip: "",
        animalScientificName: "",
        animalCommonName: "",
        animalId: "",
        encounters: []
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
            .then(tripObj => this.setState(() => ({ trip: tripObj.trip })))
    } //this.setState(() => ({ trip: tripObj.trip }))

    encounterAnimalHandler = (animal) => {
        this.setState(() => ({
            animalScientificName: animal.scientific_name,
            animalCommonName: animal.common_name,
            animalId: animal.id,
            encounters: []
        }))
    }

    encounterNotesHandler = (note) => {
        // console.log(this.state.animalId, note)
        const encounterObj = {
            trip_id: this.state.trip.id,
            animal_id: this.state.animalId,
            time_of_day: note.time_of_day,
            weather_conditions: note.weather_conditions,
            notes: note.notes
        }

        const options = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-type': 'application/json',
                'Accepts': 'application/json',
            },
            body: JSON.stringify(encounterObj)
        }

        fetch('http://localhost:3000/api/v1/encounters', options)

    }

    mapEncounters = () => {
        return this.state.trip.my_encounters.map(encounter => {
            return (<NavLink to={`/encounter/${encounter.id}`}><h1 onClick={() => {
                localStorage.setItem("sci_name", encounter.animal_scientific_name)
                localStorage.setItem("common_name", encounter.animal_common_name)
            }}>{encounter.animal_common_name}</h1></NavLink>)
        })
    }

    render() {
        return (
            <div id="trip">
                <SearchForm encounterAnimalHandler={this.encounterAnimalHandler} />
                <EncounterForm encounterNotesHandler={this.encounterNotesHandler} />
                <h1 id="trip-show">{this.state.trip.destination} - {this.state.trip.date}</h1>
                {this.state.trip ? this.mapEncounters() : <h3>LOADING..</h3>}
            </div>
        )
    }
}

export default withRouter(TripShow)