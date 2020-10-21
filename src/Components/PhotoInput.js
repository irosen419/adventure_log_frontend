import React from 'react'

class PhotoInput extends React.Component {

    state = {
        photo_URLs: [],
        photos: []
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.encounterPhotoHandler(this.state.photos)
        this.setState(() => ({ photo_URLs: [] }))
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
            <div id="photo-input">
                <div id="preview-flex">
                    {this.state.photo_URLs ? this.previewImages() : null}
                </div>
                <form onSubmit={this.submitHandler}>
                    <input id="photo-add"
                        hidden
                        type="file"
                        multiple name="photos"
                        accept="image/*"
                        onChange={this.pictureHandler}
                    />
                    <label id="photo-add-label" for="photo-add">Click here to add photos</label>
                    <input className="submit" type="submit" value="Submit Photos" />
                </form>
            </div>
        )
    }
}

export default PhotoInput