import React from 'react'
import { withRouter } from 'react-router-dom'
import SearchForm from '../Components/AnimalSearchForm'
import EncounterForm from '../Components/EncounterForm'
import PhotoInput from '../Components/PhotoInput'
import ConservationContainer from './ConservationContainer'
import PhotoModal from '../Components/PhotoModal'
import * as AiIcons from 'react-icons/ai'

class EncounterShow extends React.Component {

    state = {
        encounter: "",
        animalInfo: "",
        animalId: "",
        edit: false,
        selectedButton: 'Population Trend',
        modal: false,
        modalNum: 0
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

    encounterPhotoHandler = (photos) => {
        const encounterId = window.location.pathname.split('/')[2]
        let formData = new FormData()

        if (photos) {
            const files = photos;
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
        console.log("Photos: ", photos)

        fetch(`http://localhost:3000/api/v1/encounters/${encounterId}/photos`, options)
            .then(resp => resp.json())
            .then((encounter) => {
                console.log("ENCOUNTER", encounter)
                this.setState(() => ({
                    encounter: encounter.encounter
                }), () => this.fetchAnimalInfo())
            })
    }

    mapImages = () => {
        const photos = this.state.encounter.encounter_images.record.photos
        return photos.map(img_url => {
            // console.log("Index: ", photos.indexOf(img_url))
            return <img
                key={photos.indexOf(img_url)}
                src={img_url}
                alt={localStorage.getItem("common_name")}
                onClick={() =>
                    this.showModal(photos.indexOf(img_url))
                }
            />
        })
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

    showModal = (index) => {
        this.setState(() => ({
            modal: true,
            modalNum: index
        }))
    }

    closeModal = () => {
        this.setState(() => ({ modal: false }))
    }

    render() {
        console.log("Modal: ", this.state.modal, "Num: ", this.state.modalNum)
        return (
            <div id='encounter-main'>
                {
                    this.state.modal ?
                        <PhotoModal
                            photos={this.state.encounter.encounter_images.record.photos}
                            initialIndex={this.state.modalNum}
                            closeModal={this.closeModal} />
                        : null
                }
                <div id="inner-encounter">
                    <div id='encounter-info'>
                        <div id="encounter-flex">
                            {
                                this.state.encounter ?
                                    <div id="notes">
                                        <h1><strong>{this.state.encounter.animal_common_name}</strong></h1>
                                        <div><strong>Time of day: </strong>{this.state.encounter.time_of_day}</div>
                                        <div><strong>Weather conditions: </strong>{this.state.encounter.weather_conditions}</div>
                                        <div><strong>Notes: </strong>{this.state.encounter.notes}</div>
                                    </div>
                                    : null
                            }
                            <div id="buttons">
                                <button onClick={() => this.setState(() => ({ edit: true }))}>Edit this encounter</button>
                                <button onClick={this.deleteEncounter}>Delete this encounter</button>
                            </div>
                        </div>
                        {this.state.encounter ? <ConservationContainer encounter={this.state.encounter} selectedButton={this.selectedButton} selectedInfo={this.selectedInfo} /> : null}
                        <PhotoInput encounterPhotoHandler={this.encounterPhotoHandler} />

                        <div id='image-grid'>
                            {this.state.encounter ? this.mapImages() : null}
                        </div>
                    </div>
                    {
                        this.state.edit ?
                            <div id='edit-form'>
                                <div id='inner-form'>
                                    <span onClick={() => this.setState(() => ({ edit: false }))}><AiIcons.AiOutlineClose /></span>
                                    <SearchForm encounterAnimalHandler={this.encounterAnimalHandler} />
                                    <EncounterForm encounterNotesHandler={this.encounterNotesHandler} edit={this.state.edit} />
                                </div>
                            </div>
                            : null
                    }
                </div>
            </div >
        )
    }
}

export default withRouter(EncounterShow)