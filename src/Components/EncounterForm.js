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
        this.setState(() => ({ photo_URLs: [] }), () => {
            for (const file of fileArray) {
                const fileReader = new FileReader()
                fileReader.readAsDataURL(file)
                fileReader.onloadend = () => {
                    this.setState(() => ({
                        photo_URLs: [fileReader.result, ...this.state.photo_URLs]
                    }))
                }
            }
        })
        this.setState(() => ({
            photos: fileArray
        }))
    }

    previewImages = () => {
        return this.state.photo_URLs.map(img => <img className="image-preview" src={img} alt="Alt" />)
    }

    render() {
        return (
            <div id="encounter-form">
                <div id="preview-flex">
                    {this.state.photo_URLs ? this.previewImages() : null}
                </div>
                <form onSubmit={this.submitHandler}>
                    <select name="time_of_day" value={this.state.time_of_day} onChange={this.changeHandler}>
                        <option>Time of Day</option>
                        <option>Morning</option>
                        <option>Afternoon</option>
                        <option>Evening</option>
                    </select>
                    <input type="text" name="weather_conditions" placeholder="Describe the weather" value={this.state.weather_conditions} onChange={this.changeHandler} />
                    <input type="textarea" name="notes" placeholder="Describe the encounter" value={this.state.notes} onChange={this.changeHandler} />
                    <input id="photos" type="file" multiple hidden name="photos" accept="image/*" onChange={this.pictureHandler} />
                    <label id="photo-add-label" for="photos">Click here to add photos</label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default EncounterForm