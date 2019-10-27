import React from 'react';
import './KeyComponent.css';

function Key(props) {
    return (
        <button className={"key " + props.btnState}>{props.value}</button>
    )
}

export default Key;