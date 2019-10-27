import React from 'react';
import logo from '../../assets/turret_logo.png';
import './Elements.css';

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
        <img src={logo} className="logo"/>
    );
}