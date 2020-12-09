import React from 'react'
import { withRouter } from 'react-router-dom'

class AnimalSearchForm extends React.Component {

    state = {
        search: [],
        animalsArray: [],
        suggestions: []
    }

    componentDidMount() {
        this.fetchAnimals()
    }

    fetchAnimals = () => {
        const configObj = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }
        }

        fetch('https://fast-refuge-38524.herokuapp.com/api/v1/animals', configObj)
            .then(resp => resp.json())
            .then(animals => this.setState(() => ({ animalsArray: animals })))
    }

    changeHandler = (e) => {
        e.persist()
        this.setState(() => ({ search: e.target.value }), () => {
            let listOfAnimals = this.state.animalsArray
            let suggestions = []
            if (this.state.search.length > 0) {
                suggestions = listOfAnimals.filter(animal => animal.common_name.toLowerCase().includes(this.state.search.toLowerCase()))
            }
            this.setState(() => ({ suggestions: suggestions }))
        })
    }

    clickHandler = (animal) => {
        this.setState(() => ({
            search: animal.common_name,
            suggestions: []
        }))
        this.props.encounterAnimalHandler(animal)
    }

    mapAnimals = () => {
        return this.state.suggestions.map(animal => <li key={animal.id} onClick={() => this.clickHandler(animal)}>{animal.common_name}</li>)
    }

    renderSuggestions = () => {
        const { suggestions } = this.state
        if (suggestions.length === 0) {
            return null
        } else {
            return (
                <ul>
                    {this.mapAnimals()}
                </ul>
            )
        }
    }

    render() {
        return (
            <form className="search-bar">
                <h3>What animal did you see?</h3>
                <input type="text" name="search" placeholder="Search..." value={this.state.search} onChange={this.changeHandler} />
                {this.renderSuggestions()}
            </form>
        )
    }
}

export default withRouter(AnimalSearchForm)