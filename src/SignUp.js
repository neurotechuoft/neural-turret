import React, { Component } from 'react';
import logo from './mindtype_logo.png';
import Sockets from "./helpers/getSockets";

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
      'username': this.state.emailValue,
      'password': this.state.passwordValue,
      'email': this.state.emailValue
    };
	 client_socket.emit("register", JSON.stringify(signup), this.checkSignUp);
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
        <img src={logo} className="logoMindType"/><br />
        <br/>
        <input type="text" className="name-user" placeholder="Name" value={this.nameValue}></input><br />
        <br />
        <input type="email" className="email-input" placeholder="Email" value={this.emailValue}></input><br />
        <br />
        <input type="password" className="password-input" placeholder="Password" value={this.passwordValue}></input><br />
        <br />
        <button className="sign-up" onClick={this.handleSignUpClick}>Sign Up</button>
		<br />
		<button className="back" onClick={this.props.goBack}>Go Back</button>
      </div>
    )
  }
}

export default SignUp;
