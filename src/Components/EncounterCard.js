import React from 'react'

function EncounterCard(props) {
    return (
        <div className="encounter-card">
            <div>{props.encounter.animal_common_name}</div>
            {props.encounter.encounter_images.record.photos[0] ?
                <img src={props.encounter.encounter_images.record.photos[0]}
                    alt={props.encounter.animal_common_name}
                />
                : null}
        </div>
    )
}

export default EncounterCard