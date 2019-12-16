import React from 'react';
import logo from '../../assets/turret_logo.png';
import './Elements.css';
import PropTypes from 'prop-types';

export function Button(props){
    return (
        <button 
            className={props.className + " button"} 
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

export function Logo(props){
    return (
        <img src={props.logo? props.logo: logo} className="logo" alt="logo" />
    );
}

Button.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    value: PropTypes.string,
};

Logo.propTypes = {
    logo: PropTypes.object
};