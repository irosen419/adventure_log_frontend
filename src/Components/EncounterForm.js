import React from 'react'

class EncounterForm extends React.Component {

    state = {
        time_of_day: "",
        weather_conditions: "",
        notes: "",
        photo_URLs: [],
        photos: []
    }

    changeHandler = (e) => {
        e.persist()
        this.setState(() => ({ [e.target.name]: e.target.value }))
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.encounterNotesHandler(this.state)
        this.setState(() => ({
            time_of_day: "",
            weather_conditions: "",
            notes: ""
        }))
    }

    pictureHandler = (e) => {
        e.persist()
        let fileArray = []
        let i = 0;
        while (i < e.target.files.length) {
            fileArray.push(e.target.files[i])
            i++
        }
        for (const file of fileArray) {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onloadend = () => {
                this.setState(() => ({
                    photo_URLs: [fileReader.result, ...this.state.photo_URLs]
                }))
            }
        }
        this.setState(() => ({
            photos: fileArray
        }))
    }

    render() {
        console.log(this.state.photo_URLs)
        return (
            <form onSubmit={this.submitHandler}>
                <select name="time_of_day" value={this.state.time_of_day} onChange={this.changeHandler}>
                    <option>Time of Day</option>
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                </select>
                <input type="text" name="weather_conditions" placeholder="Describe the weather" value={this.state.weather_conditions} onChange={this.changeHandler} />
                <input type="textarea" name="notes" placeholder="Describe the encounter" value={this.state.notes} onChange={this.changeHandler} />
                <input type="file" multiple name="photos" accept="image/*" onChange={this.pictureHandler} />
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default EncounterForm