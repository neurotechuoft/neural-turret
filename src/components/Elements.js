import React from 'react';
import logo from '../assets/mindtype_logo.png';

export function Button(props){
    return (
        <button 
            className={props.className} 
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

export function Logo(props){
    return (
        <img src={logo} className="logoMindType"/>
    );
}