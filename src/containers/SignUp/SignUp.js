import React, { Component } from 'react';
import logo from '../../assets/mindtype_logo.png';
import Sockets from "../../helpers/getSockets";

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
  
  handleNameChange(event){
    this.setState({
      nameValue: event.target.value
    });
  }  
  handleEmailChange(event){
    this.setState({
      emailValue: event.target.value
    });
  }  
  handlePasswordChange(event){
    this.setState({
      passwordValue: event.target.value
    });
  }

  render(){
    return (
      <div>
        <img src={logo} className="logoMindType"/><br />
        <br/>
        <input type="text" 
          className="name-user" 
          placeholder="Name" 
          value={this.state.nameValue}
          onChange={this.handleNameChange.bind(this)}
        >
        </input>
        <br />
        <br />
        <input type="email" 
          className="email-input" 
          placeholder="Email" 
          value={this.state.emailValue}
          onChange={this.handleEmailChange.bind(this)}>
        </input>
        <br />
        <br />
        <input type="password" 
          className="password-input" 
          placeholder="Password" 
          value={this.state.passwordValue}
          onChange={this.handlePasswordChange.bind(this)}>
        </input>
        <br />
        <br />
        <button className="sign-up" onClick={this.handleSignUpClick}>Sign Up</button>
		<br />
		<button className="back" onClick={this.props.goBack}>Go Back</button>
      </div>
    )
  }
}

export default SignUp;
