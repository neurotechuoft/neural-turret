import React, { Component } from 'react';
import Sockets from "../../helpers/getSockets";
import {EmailInput, PasswordInput, NameInput} from "../../components/FormFields";
import {Button, Logo} from "../../components/Elements";
import {Control, screens} from '../Control/Control';

// Sockets 
const client_socket = (new Sockets()).client_socket;

class SignUp extends React.Component {
	
	constructor(props) {
    super(props);
	  this.state = { 
      emailValue: '',
	    passwordValue: '',
	    nameValue: ''
    };
    this.handleSignUpClick = this.handleSignUpClick.bind(this);
  }
	
  handleSignUpClick(){
    let signup = {
      'username': this.state.nameValue,
      'password': this.state.passwordValue,
      'email': this.state.emailValue
    };
    if(this.registerUser(signup)) {
      this.props.updateDisplay(screens.SELECTION);
    }
  }
  
  // Returns true iff the user was registered successfully.
  registerUser(details){
    // Currently hard coded. In future will link to DB and have validation checks
    return true;
  }

  render(){
    return (
      <div>
        <Logo/>
        <NameInput onChange={this.setState} />
        <EmailInput onChange={this.setState} />
        <PasswordInput onChange={this.setState} />
        <Button className="sign-up" onClick={this.handleSignUpClick} value="Sign Up"/>
		    <Button className="back" onClick={() => this.props.updateDisplay(screens.WELCOME)} value="Go Back"/>
      </div>
    )
  }
}

export default SignUp;
