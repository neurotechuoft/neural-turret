import React from 'react';
import './KeyComponent.css';
import PropTypes from 'prop-types';

function Key(props) {
    return (
        <button className={"key " + props.btnState}>{props.value}</button>
    )
}

export default Key;

Key.propTypes = {
    btnState: PropTypes.string,
    value: PropTypes.string
  };