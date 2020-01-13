import React from 'react';
import Welcome from '../Welcome/Welcome';
import MoreInfo from '../MoreInfo/MoreInfo';
import Training from '../Training/Training';
import Turret from '../Turret/Turret';
import './Control.css';

export const screens = {
	WELCOME: "welcome",
	MORE_INFO: "moreInfo",
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
		this.goBack = this.goBack.bind(this);
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

	goBack(){
		this.updateDisplay(this.state.prevDisplay);
	}

	render() {
		let element;
        if (this.isScreenDisplay(screens.WELCOME)){
			element = <Welcome updateDisplay={this.updateDisplay}/>
        } else if (this.isScreenDisplay(screens.MORE_INFO)){
			element = <MoreInfo updateDisplay={this.updateDisplay} goBack={this.goBack}  />
		} else if (this.isScreenDisplay(screens.TRAIN)){
			element = <Training updateDisplay={this.updateDisplay} goBack={this.goBack}  />
		} else if (this.isScreenDisplay(screens.APP)){
			element = <Turret updateDisplay={this.updateDisplay} goBack={this.goBack}  />
		}
		return (
			<div>
			{element}
			</div>
		)
	}
}

export default Control;
