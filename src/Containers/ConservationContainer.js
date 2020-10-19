import React from 'react'
import CategoryCard from '../Components/CategoryCard'
import DownArrow from '../images/down_arrow.png'
import UpArrow from '../images/up_arrow.png'
import Stable from '../images/stable.png'
import { Loading } from 'react-loading-dot'

function ConservationContainer(props) {

    const categories = ['Population Trend', 'Population', 'Geographic Range', 'Habitat', 'Threats', 'Conservation Measures']

    const showDecreasing = (props) => {
        if (props.selectedInfo() === 'decreasing') {
            return (
                <div id="inner-info">
                    <img src={DownArrow} alt='decreasing' />
                    <div id="population-headers">
                        <h3>{props.encounter.animal_common_name} populations are</h3>
                        <h2>decreasing</h2>
                    </div>
                </div>
            )
        } else if (props.selectedInfo() === 'increasing') {
            return (
                <div id="inner-info">
                    <img src={UpArrow} alt='increasing' />
                    <div id="population-headers">
                        <h3>{props.encounter.animal_common_name} populations are</h3>
                        <h2>increasing</h2>
                    </div>
                </div>
            )
        } else if (props.selectedInfo() === 'stable') {
            return (
                <div id="inner-info">
                    <img src={Stable} alt='stable' />
                    <div id="population-headers">
                        <h3>{props.encounter.animal_common_name} populations are</h3>
                        <h2>stable</h2>
                    </div>
                </div>
            )
        } else {
            return <p>{props.selectedInfo().replace(/(<([^>]+)>)/ig, '')}</p>
        }
    }

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
                {props.selectedInfo() ? showDecreasing(props) : <Loading />}
            </div>
        </div>
    )//<h3>Please wait while we load your conservation information</h3> 
}

export default ConservationContainer