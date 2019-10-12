import React, { Component } from 'react';
import logo from '../../assets/mindtype_logo.png';


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
    // robot_socket.emit("login", JSON.stringify(login), this.checkLogin);
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
        <img src={logo} className="logoMindType"/><br />
        <br/>
        <input type="email" value={this.state.emailValue} className="email-input" placeholder="Email"></input><br />
        <br />
        <input type="password" value={this.state.passwordValue} className="password-input" placeholder="Password"></input><br />
        <br />
        <button className="login" onClick={this.handleLoginClick}>Login</button>
		<br />
		<button className="back" onClick={this.props.goBack}>Go Back</button>
      </div>
    )
  }
}

export default Login;