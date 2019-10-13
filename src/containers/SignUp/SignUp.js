import React, { Component } from 'react';
import Sockets from "../../helpers/getSockets";
import {EmailInput, PasswordInput, NameInput} from "../../components/FormFields";
import {Button, Logo} from "../../components/Elements";

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
	  this.checkSignUp = this.checkSignUp.bind(this);
  }
	
  handleSignUpClick(){
    let signup = {
      'username': this.state.nameValue,
      'password': this.state.passwordValue,
      'email': this.state.emailValue
    };
    console.log(signup);
   //client_socket.emit("register", JSON.stringify(signup), this.checkSignUp);
   this.props.signUpHandler();
  }
  
  checkSignUp(sid, tf){
	  if (tf === false){
		  alert('The information you entered is invalid or the email is already taken');
	  } else {
		  this.props.signUpHandler();
	  }
  }

  render(){
    return (
      <div>
        <Logo/>
        <NameInput onChange={this.setState} />
        <EmailInput onChange={this.setState} />
        <PasswordInput onChange={this.setState} />
        <Button className="sign-up" onClick={this.handleSignUpClick} value="Sign Up"/>
		    <Button className="back" onClick={this.props.goBack} value="Go Back"/>
      </div>
    )
  }
}

export default SignUp;
