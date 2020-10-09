import React from 'react'

class AnimalShow extends React.Component {

    state = {
        infoOn: false
    }

    nameSplit = () => {
        const title = this.props.title
        switch (title) {
            case ('geographicrange'):
                return 'Geographic Range'
            case ('conservationmeasures'):
                return 'Conservation Measures'
            case ('populationtrend'):
                return 'Population Trend'
            default:
                return title.charAt(0).toUpperCase() + title.slice(1)
        }
    }

    render() {
        return (
            <div className="info-card">
                <h2 onClick={() => this.setState((previousState) => ({ infoOn: !previousState.infoOn }))}>{this.props.title ? this.nameSplit() : null}</h2>
                {this.state.infoOn ? <p>{this.props.info ? this.props.info.replace(/(<([^>]+)>)/ig, '') : null}</p> : null}
            </div>
        )
    }
}

export default AnimalShow