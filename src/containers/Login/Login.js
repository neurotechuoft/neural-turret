import React, { Component } from 'react';
import Sockets from "../../helpers/getSockets";
import {EmailInput, PasswordInput} from "../../components/FormFields";
import {Button, Logo} from "../../components/Elements";

// Sockets 
const client_socket = (new Sockets()).client_socket;

class Login extends React.Component {
	constructor(props) {
    super(props);
	  this.state = { 
      emailValue: '',
	    passwordValue: ''
    };
    this.handleLoginClick = this.handleLoginClick.bind(this);
	  this.checkLogin = this.checkLogin.bind(this);
  }
	
  handleLoginClick(){
    let login = {
      'username': this.state.emailValue,
      'password': this.state.passwordValue
    };
    //client_socket.emit("login", JSON.stringify(login), this.checkLogin);
    this.props.loginHandler();
  }
  
  checkLogin(sid, tf){
    if (tf === false){
      alert('Please enter a valid email that has not been taken and a valid password');
    } else {
      this.props.loginHandler();
    }
  }

  render(){
    return (
      <div>
        <Logo/>
        <EmailInput onChange={this.setState}/>
        <PasswordInput onChange={this.setState}/>
        <Button className="login" onClick={this.handleLoginClick} value="Login"/>
        <Button className="back" onClick={this.props.goBack} value="Go Back"/>
      </div>
    )
  }
}

export default Login;
