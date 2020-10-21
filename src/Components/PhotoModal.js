import React from 'react'
import * as GrIcons from 'react-icons/gr'

class PhotoModal extends React.Component {

    state = {
        index: this.props.initialIndex
    }

    photoArrows = () => {
        return (
            this.props.photos.length > 1 ?
                <div className="arrows">
                    <div id="inner-arrows">
                        {this.state.index > 0 ? <button id="previous" onClick={() => this.setState((previousState) => ({ index: previousState.index - 1 }))}><GrIcons.GrPrevious /></button> : null}
                        {this.state.index < this.props.photos.length - 1 ? <button id="next" onClick={() => this.setState((previousState) => ({ index: previousState.index + 1 }))}><GrIcons.GrNext /></button> : null}
                        {this.moveCounter()}
                    </div>
                </div>
                : null
        )
    }

    moveCounter = () => {
        return this.props.photos.length > 1 ? <span id="fraction">{this.state.index + 1} / {this.props.photos.length}</span> : null
    }

    render() {
        return (
            <div id="photo-modal">
                <span id="close" onClick={this.props.closeModal}>x</span>
                {this.photoArrows()}
                <img src={`${this.props.photos[this.state.index]}`} alt="#" />
            </div>
        )
    }
}

export default PhotoModal