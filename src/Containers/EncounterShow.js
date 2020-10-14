import React from 'react'
import { withRouter } from 'react-router-dom'
import AnimalShow from '../Components/AnimalShow'
import SearchForm from '../Components/SearchForm'
import EncounterForm from '../Components/EncounterForm'

class EncounterShow extends React.Component {

    state = {
        encounter: "",
        animalInfo: "",
        animalId: "",
        edit: false
    }

    componentDidMount() {
        const token = localStorage.getItem("token")
        const encounterId = window.location.pathname.split('/')[2]
        const options = {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        }
        this.fetchAnimalInfo()

        fetch(`http://localhost:3000/api/v1/encounters/${encounterId}`, options)
            .then(resp => resp.json())
            .then(encounterObj => this.setState(() => ({ encounter: encounterObj.encounter })))
    }

    fetchAnimalInfo = () => {
        const animal = localStorage.getItem("sci_name").toLowerCase().split(" ").join("%20")
        fetch(`https://apiv3.iucnredlist.org/api/v3/species/narrative/${animal}?token=${process.env.REACT_APP_IUCN_KEY}`)
            .then(resp => resp.json())
            .then(data => this.setState(() => ({ animalInfo: data.result[0] })))
    }

    mapInfo = () => {
        let array = []
        for (let attr in this.state.animalInfo) {
            if (attr !== 'species_id' && attr !== 'rationale' && attr !== 'taxonomicnotes' && attr !== 'usetrade') {
                array.push(<AnimalShow title={attr} info={this.state.animalInfo[attr]} />)
            }
        }
        return array
    }

    deleteEncounter = () => {
        const encounterId = window.location.pathname.split('/')[2]
        const options = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-type': 'application/json',
                'Accepts': 'application/json',
            }
        }

        fetch(`http://localhost:3000/api/v1/encounters/${encounterId}`, options)
            .then(resp => resp.json())
            .then((data) => {
                if (data.success) {
                    this.props.history.goBack()
                } else {
                    console.log(data.error)
                }
            })
    }

    encounterAnimalHandler = (animal) => {
        localStorage.setItem("common_name", animal.common_name)
        localStorage.setItem("sci_name", animal.scientific_name)
        this.setState(() => ({
            animalId: animal.id
        }))
    }

    encounterNotesHandler = (note) => {
        const encounterId = window.location.pathname.split('/')[2]
        // let formData = new FormData()

        // if (this.state.animalId) { formData.append('encounter[animal_id]', this.state.animalId) }
        // if (note.time_of_day) { formData.append('encounter[time_of_day]', note.time_of_day) }
        // if (note.weather_conditions) { formData.append('encounter[weather_conditions]', note.weather_conditions) }
        // if (note.notes) { formData.append('encounter[notes]', note.notes) }
        // if (note.photo) { formData.append('encounter[photo]', note.photo) }

        let editObj = {}

        if (this.state.animalId) { editObj.animal_id = this.state.animalId }
        if (note.time_of_day) { editObj.time_of_day = note.time_of_day }
        if (note.weather_conditions) { editObj.weather_conditions = note.weather_conditions }
        if (note.notes) { editObj.notes = note.notes }

        const options = {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-type': 'application/json',
                'Accepts': 'application/json',
            },
            body: JSON.stringify(editObj)
        }

        fetch(`http://localhost:3000/api/v1/encounters/${encounterId}`, options)
            .then(resp => resp.json())
            .then((encounter) => {
                console.log("ENCOUNTER", encounter)
                this.setState(() => ({
                    encounter: encounter.encounter,
                    edit: false
                }), () => this.fetchAnimalInfo())
            })
    }

    mapImages = () => {
        return this.state.encounter.encounter_images.record.photos.map(img_url => <img src={img_url} alt={localStorage.getItem("common_name")} />)
    }

    render() {
        console.log(this.state.encounter)
        return (
            <div id='encounter-main'>
                <div id='encounter-info'>
                    <h1>{localStorage.getItem("common_name")}</h1>
                    <div>{this.state.encounter ? this.state.encounter.time_of_day : null}</div>
                    <div>{this.state.encounter ? this.state.encounter.weather_conditions : null}</div>
                    <div>{this.state.encounter ? this.state.encounter.notes : null}</div>
                    {this.state.animalInfo ? this.mapInfo() : <h3>Loading conservation information...</h3>}
                    {this.state.edit ? <div id='edit-form'>
                        <SearchForm encounterAnimalHandler={this.encounterAnimalHandler} />
                        <EncounterForm encounterNotesHandler={this.encounterNotesHandler} edit={this.state.edit} />
                    </div>
                        : null}
                    <button onClick={this.deleteEncounter}>Delete this encounter</button>
                    <button onClick={() => this.setState(() => ({ edit: true }))}>Edit this encounter</button>
                </div>
                {this.state.encounter ? this.mapImages() : null}
            </div>
        )
    }
}

export default withRouter(EncounterShow)