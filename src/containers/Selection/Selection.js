import React, { Component } from 'react';
import {Button} from "../../components/Elements";
import {Control, screens} from '../Control/Control';

export default class Selection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
  
  render(){
    return (
      <div>
        <Button 
            className="train" 
            onClick={() => this.props.updateDisplay(screens.TRAIN)} 
            value="Train the Turret"
        />
        <Button 
            className="use-turret" 
            onClick={() => this.props.updateDisplay(screens.APP)} 
            value="Use the Turret"
        />
        <Button 
            onClick={() => this.props.updateDisplay(screens.MORE_INFO)} 
            className="more-info" 
            value="More Info"
        />
        <Button 
            onClick={() => this.props.updateDisplay(screens.MORE_INFO)} 
            className="more-info" 
            value="More Info"
        />
      </div>
    )
  }
}
