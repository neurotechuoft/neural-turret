import React, { Component } from 'react';
import App from '../App/App';
import Welcome from '../Welcome/Welcome';
import MoreInfo from '../MoreInfo/MoreInfo';
import Training from '../Training/Training';
import Final from '../Final/Final';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import Selection from "../Selection/Selection"

export const screens = {
	WELCOME: "welcome",
	LOGIN: "login",
	SIGNUP: "signup",
	MORE_INFO: "moreInfo",
	SELECTION: "selection",
	TRAIN: "train",
	APP: "app",
}

class Control extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			screenDisplay: screens.WELCOME,
			prevDisplay: null
		};
		this.updateDisplay = this.updateDisplay.bind(this);
    }

	updateDisplay(newScreen){
		this.setState({
			prevDisplay: this.state.screenDisplay,
			screenDisplay: newScreen
		});
	}

	isScreenDisplay(screenDisplay){
		return this.state.screenDisplay === screenDisplay;
	}

	render() {
		let element;
        if (this.isScreenDisplay(screens.WELCOME)){
			element = <Welcome updateDisplay={this.updateDisplay}/>
        } else if (this.isScreenDisplay(screens.LOGIN)){
			element = <Login updateDisplay={this.updateDisplay} goBack={() => this.updateDisplay(this.state.prevDisplay) } />;
        } else if (this.isScreenDisplay(screens.SIGNUP)){
			element = <SignUp updateDisplay={this.updateDisplay} goBack={() => this.updateDisplay(this.state.prevDisplay) } />;
		} else if (this.isScreenDisplay(screens.MORE_INFO)){
			element = <MoreInfo updateDisplay={this.updateDisplay} goBack={() => this.updateDisplay(this.state.prevDisplay) }  />
		} else if (this.isScreenDisplay(screens.SELECTION)){
			element = <Selection updateDisplay={this.updateDisplay} />
		} else if (this.isScreenDisplay(screens.TRAIN)){
			element = <Training updateDisplay={this.updateDisplay} goBack={() => this.updateDisplay(this.state.prevDisplay) }  />
		} else if (this.isScreenDisplay(screens.APP)){
			element = <App updateDisplay={this.updateDisplay} goBack={() => this.updateDisplay(this.state.prevDisplay) }  />
		}
		return (
			<div>
			{element}
			</div>
		)
	}
}

export default Control;
