import React from 'react';
import {Logo, Button} from '../../components/Elements';
import {Control, screens} from '../Control/Control';

export default function Welcome(props){
  return (
    <div>
      <Logo/>
      <Button 
        onClick={() => props.updateDisplay(screens.LOGIN)} 
        className="login" 
        value="Login"
      />
      <Button 
        onClick={() => props.updateDisplay(screens.SIGNUP)} 
        className="sign-up" 
        value="Sign Up"
      />
      <Button 
        onClick={() => props.updateDisplay(screens.MORE_INFO)} 
        className="help-screen" 
        value="More Info"
      />
    </div>
  );
}
