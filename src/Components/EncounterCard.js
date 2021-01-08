import React from 'react'

function EncounterCard(props) {
    return (
        <div className="encounter-card">
            <div>{props.encounter.animal_common_name}</div>
            {props.encounter.photos[0] ?
                <>
                    <img src={props.encounter.photos[0]}
                        alt={props.encounter.animal_common_name}
                    />
                </>
                : null}
        </div>
    )
}

export default EncounterCard