import React, { Component } from 'react';
import Key from './KeyComponent';
import PropTypes from 'prop-types';

class Arrows extends Component {
    static get BTN_VALS() {
        return ["↖", "↑", "↗",
                "←", "o", "→"]
    }

    static get ROWS() {
        return [[0,1,2], [3,4,5]]
    }

    static get COLS() {
        return [[0,3], [1,4], [2,5]]
    }

    static ANGLE(arrow) {
        let arrowAngles = {
            "↖" : 135, 
            "↑" : 90,
            "↗" : 45,
            "←" : 180,
            "o" : -1,
            "→" : 0
        };
        return arrowAngles[arrow];
    }

    render() {
        return (
            <div className="userInput">
                <Key value={Arrows.BTN_VALS[0]} btnState={this.props.btnStates[0]}/>
                <Key value={Arrows.BTN_VALS[1]} btnState={this.props.btnStates[1]} />
                <Key value={Arrows.BTN_VALS[2]} btnState={this.props.btnStates[2]} />
                <br />
                <Key value={Arrows.BTN_VALS[3]} btnState={this.props.btnStates[3]} />
                <Key value={Arrows.BTN_VALS[4]} btnState={this.props.btnStates[4]} />
                <Key value={Arrows.BTN_VALS[5]} btnState={this.props.btnStates[5]} />
            </div>
        )
    }
}

export default Arrows;

Arrows.propTypes = {
    btnStates: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  };