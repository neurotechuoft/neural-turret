import React, { Component } from 'react';
import Key from './KeyComponent';

class Arrows extends Component {

    constructor(props) {
        super(props);
    }

    static get BTN_VALS() {
        return ["↖", "↑", "↗",
                "←", "o", "→"]
    }

    static get BTN_ANGLES() {
        return [45, 90, 135,
                180, 90, 0]
    }

    static get ROWS() {
        return [[0,1,2], [3,4,5]]
    }

    static get COLS() {
        return [[0,3], [1,4], [2,5]]
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