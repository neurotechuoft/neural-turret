import React from 'react';

function Key(props) {
    return (
        <button className={"entry " + props.btnState + " " + props.keyFormat}>{props.value}</button>
    )
}

export default Key;