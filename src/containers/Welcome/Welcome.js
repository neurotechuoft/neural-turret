import React from 'react';
import {Logo, Button} from '../../components/Elements/Elements';
import {screens} from '../Control/Control';
import './Welcome.css';
import PropTypes from 'prop-types';

export default function Welcome(props){
  return (
    <div>
      <Logo/>
      <div id='btn-container'>
      <Button 
          className="train" 
          onClick={() => props.updateDisplay(screens.TRAIN)} 
          value="Train the Turret"
      />
      <div className="divider" />
      <Button 
          className="use-turret" 
          onClick={() => props.updateDisplay(screens.APP)} 
          value="Use the Turret"
      />
      <div className="divider" />
      <Button 
        onClick={() => props.updateDisplay(screens.MORE_INFO)} 
        className="more-info" 
        value="More Info"
      />
      </div>
    </div>
  );
}

Welcome.propTypes = {
  updateDisplay: PropTypes.func.isRequired
};