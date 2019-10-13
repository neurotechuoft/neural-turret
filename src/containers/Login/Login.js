import React, { Component } from 'react';
import logo from '../../assets/mindtype_logo.png';
import Sockets from "../../helpers/getSockets";

// Sockets 
const robot_socket = (new Sockets()).robot_socket;

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
    //robot_socket.emit("login", JSON.stringify(login), this.checkLogin);
    this.props.loginHandler();
  }
  
  checkLogin(sid, tf){
    if (tf === false){
      alert('Please enter a valid email that has not been taken and a valid password');
    } else {
      this.props.loginHandler();
    }
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
        <img src={logo} className="logoMindType"/>
        <br />
        <br/>
        <input type="email" 
          value={this.state.emailValue} 
          className="email-input" 
          placeholder="Email"
          onChange={this.handleEmailChange.bind(this)}>
        </input>
        <br />
        <br />
        <input type="password" 
          value={this.state.passwordValue} 
          className="password-input" 
          placeholder="Password"
          onChange={this.handlePasswordChange.bind(this)}>
        </input>
        <br />
        <br />
        <button className="login" onClick={this.handleLoginClick}>Login</button>
		    <br />
		    <button className="back" onClick={this.props.goBack}>Go Back</button>
      </div>
    )
  }
}

export default Login;
