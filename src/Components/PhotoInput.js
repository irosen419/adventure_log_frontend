import React from 'react'

class PhotoInput extends React.Component {

    state = {
        photo_URLs: [],
        photos: []
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.encounterPhotoHandler(this.state.photos)
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
        console.log(fileArray)
        this.setState(() => ({
            photos: fileArray
        }))
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
                <input type="file" multiple name="photos" accept="image/*" onChange={this.pictureHandler} />
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

export default PhotoInput