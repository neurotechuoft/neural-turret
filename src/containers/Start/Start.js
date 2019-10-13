import React, { Component } from 'react';
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';
import {Logo, Button} from '../../components/Elements';

class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {display: 'welcome'};
  }
	
	goBack(){
		this.setState({display: 'welcome'});
	}

  render() {
    if (this.state.display === 'welcome'){
      return (
        <div>
          <Logo/>
          <Button 
            onClick={() => this.setState({display: 'login'})} 
            className="login" 
            value="Login"
          />
          <Button 
            onClick={() => this.setState({display: 'sign-up'})} 
            className="sign-up" 
            value="Sign Up"
          />
        </div>
      );
    } 
    if (this.state.display === 'login'){
      return (
        <div>
          <Login loginHandler={this.props.loginHandler} goBack={this.goBack.bind(this)}/>
        </div>
      );
    } 
    if (this.state.display === 'sign-up') {
      return (
        <div>
          <SignUp goBack={this.goBack.bind(this)} signUpHandler={this.props.signUpHandler}/>
        </div>
      );
    }
  }
}

export default Start;
