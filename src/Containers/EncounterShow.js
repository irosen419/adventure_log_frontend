import React from 'react'
import AnimalShow from '../Components/AnimalShow'

class EncounterShow extends React.Component {

    state = {
        encounter: "",
        animalInfo: ""
    }

    componentDidMount() {
        const animal = localStorage.getItem("sci_name").toLowerCase().split(" ").join("%20")
        fetch(`https://apiv3.iucnredlist.org/api/v3/species/narrative/${animal}?token=${process.env.REACT_APP_IUCN_KEY}`)
            .then(resp => resp.json())
            .then(data => this.setState(() => ({ animalInfo: data.result[0] })))

        const token = localStorage.getItem("token")
        const encounterId = window.location.pathname.split('/')[2]
        const options = {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` }
        }

        fetch(`http://localhost:3000/api/v1/encounters/${encounterId}`, options)
            .then(resp => resp.json())
            .then(encounterObj => this.setState(() => ({ encounter: encounterObj.encounter })))
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

    render() {
        console.log(this.state.animalInfo)
        return (
            <div>
                <h1>{localStorage.getItem("common_name")}</h1>
                <h4>{this.state.encounter ? this.state.encounter.notes : null}</h4>
                {this.state.animalInfo ? this.mapInfo() : null}
            </div>
        )
    }
}

export default EncounterShow