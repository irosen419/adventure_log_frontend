import React from 'react'
import CategoryCard from '../Components/CategoryCard'

function ConservationContainer(props) {

    const categories = ['Population', 'Population Trend', 'Geographic Range', 'Habitat', 'Threats', 'Conservation Measures']

    return (
        <div id="conservation">
            <div id="grid-header">
                {categories.map(cat =>
                    <CategoryCard
                        key={categories.indexOf(cat)}
                        category={cat}
                        selectedButton={props.selectedButton}
                    />
                )}
            </div>
            <div id="iucn-info">
                {props.selectedInfo() ? <p>{props.selectedInfo().replace(/(<([^>]+)>)/ig, '')}</p> : null}
            </div>
        </div>
    )
}

export default ConservationContainer