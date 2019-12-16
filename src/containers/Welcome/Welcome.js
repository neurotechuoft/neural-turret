import React from 'react';
import {Logo, Button} from '../../components/Elements/Elements';
import {screens} from '../Control/Control';
import './Welcome.css';
import PropTypes from 'prop-types';

export default function Welcome(props){
  return (
    <div>
      <Logo/>
      <Button 
          className="train" 
          onClick={() => props.updateDisplay(screens.TRAIN)} 
          value="Train the Turret"
      />
      <Button 
          className="use-turret" 
          onClick={() => props.updateDisplay(screens.APP)} 
          value="Use the Turret"
      />
      <Button 
        onClick={() => props.updateDisplay(screens.MORE_INFO)} 
        className="more-info" 
        value="More Info"
      />
    </div>
  );
}

Welcome.propTypes = {
  updateDisplay: PropTypes.func.isRequired
};