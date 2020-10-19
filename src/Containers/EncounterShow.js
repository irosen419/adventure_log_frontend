import React from 'react'
import { withRouter } from 'react-router-dom'
import SearchForm from '../Components/AnimalSearchForm'
import EncounterForm from '../Components/EncounterForm'
import ConservationContainer from './ConservationContainer'

class EncounterShow extends React.Component {

    state = {
        encounter: "",
        animalInfo: "",
        animalId: "",
        edit: false,
        selectedButton: 'Population Trend'
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
        let formData = new FormData()

        if (this.state.animalId) { formData.append('encounter[animal_id]', this.state.animalId) }
        if (note.time_of_day) { formData.append('encounter[time_of_day]', note.time_of_day) }
        if (note.weather_conditions) { formData.append('encounter[weather_conditions]', note.weather_conditions) }
        if (note.notes) { formData.append('encounter[notes]', note.notes) }
        if (note.photos) {
            const files = note.photos;
            for (let i = 0; i < files.length; i++) {
                formData.append(`encounter[images][${i}]`, files[i])
            }
        }

        const options = {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: formData
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
        const photos = this.state.encounter.encounter_images.record.photos
        return photos.map(img_url => <img key={photos.indexOf(img_url)} src={img_url} alt={localStorage.getItem("common_name")} />)
    }

    selectedButton = (e) => {
        e.persist()
        this.setState(() => ({ selectedButton: e.target.innerText }))
    }

    selectedInfo = () => {
        if (this.state.selectedButton && this.state.animalInfo) {
            let info = this.state.animalInfo
            switch (this.state.selectedButton) {
                case ('Population'):
                    return info.population
                case ('Population Trend'):
                    return info.populationtrend
                case ('Geographic Range'):
                    return info.geographicrange
                case ('Habitat'):
                    return info.habitat
                case ('Threats'):
                    return info.threats
                case ('Conservation Measures'):
                    return info.conservationmeasures
                default:
                    return <p>Sorry. We could not find any information on this species.</p>
            }
        }
    }

    render() {
        return (
            <div id='encounter-main'>
                <div id='encounter-info'>
                    <h1>{localStorage.getItem("common_name")}</h1>
                    <div>{this.state.encounter ? this.state.encounter.time_of_day : null}</div>
                    <div>{this.state.encounter ? this.state.encounter.weather_conditions : null}</div>
                    <div>{this.state.encounter ? this.state.encounter.notes : null}</div>
                    <ConservationContainer selectedButton={this.selectedButton} selectedInfo={this.selectedInfo} />
                    {this.state.edit ? <div id='edit-form'>
                        <SearchForm encounterAnimalHandler={this.encounterAnimalHandler} />
                        <EncounterForm encounterNotesHandler={this.encounterNotesHandler} edit={this.state.edit} />
                    </div>
                        : null}
                </div>
                <div id='image-grid'>
                    {this.state.encounter ? this.mapImages() : null}
                </div>
                <button onClick={this.deleteEncounter}>Delete this encounter</button>
                <button onClick={() => this.setState(() => ({ edit: true }))}>Edit this encounter</button>
            </div>
        )
    }
}

export default withRouter(EncounterShow)