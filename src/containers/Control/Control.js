import React, { Component } from 'react';
import App from '../App/App';
import Start from '../Start/Start';
import Intro from '../Intro/Intro';
import Training from '../Training/Training';
import Final from '../Final/Final';


class Control extends React.Component {
  constructor(props) {
      super(props);
      this.state = {screenDisplay: 'start'};
	  this.loginHandler = this.loginHandler.bind(this);
	  this.signUpHandler = this.signUpHandler.bind(this);
	  this.introHandler = this.introHandler.bind(this);
	  this.trainingHandler = this.trainingHandler.bind(this);
	  this.finalHandler = this.finalHandler.bind(this);
    }
	
	loginHandler(){
		this.setState({screenDisplay: 'app'});
	}
	
	signUpHandler(){
		this.setState({screenDisplay: 'intro'});
	}
	
	introHandler(){
		this.setState({screenDisplay: 'training'});
	}

	trainingHandler(){
		this.setState({screenDisplay: 'final'});
	}
	
	finalHandler(){
		this.setState({screenDisplay: 'app'});
	}

render() {
  let element;
        if (this.state.screenDisplay === 'start'){
          element = <Start loginHandler = {this.loginHandler} signUpHandler = {this.signUpHandler}/>
        } else if (this.state.screenDisplay === 'app'){
          element = <App />;
        } else if (this.state.screenDisplay === 'intro'){
		  element = <Intro introHandler={this.introHandler}/>;
		} else if (this.state.screenDisplay === 'training'){
		  element = <Training trainingHandler={this.trainingHandler} />
		} else if (this.state.screenDisplay === 'final'){
		  element = <Final finalHandler={this.finalHandler} />
		}
  return (
    <div>
      {element}
    </div>
  )
}
}

export default Control;
