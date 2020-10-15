import React from 'react'

function CategoryCard(props) {
    return <button onClick={(e) => props.selectedButton(e)}>{props.category}</button>
}

export default CategoryCard