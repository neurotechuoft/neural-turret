import React, { Component } from 'react';
import './FormFields.css';

export class EmailInput extends React.Component {
	constructor(props) {
        super(props);
    }

    handleChange(event){
        this.props.onChange.bind(({
            emailValue: event.target.value,
        }));
    }

    render(){
        return (
        <input type="email" 
            className="email-input" 
            placeholder="Email"
            onChange={this.handleChange.bind(this)}>
        </input>);
    }
}

export class PasswordInput extends React.Component {
	constructor(props) {
        super(props);
    }

    handleChange(event){
        this.props.onChange.bind(({
            passwordValue: event.target.value,
        }));
    }

    render(){
        return (
        <input type="password" 
            className="password-input" 
            placeholder="Password"
            onChange={this.handleChange.bind(this)}>
        </input>);
    }
}

export class NameInput extends React.Component {
	constructor(props) {
        super(props);
    }

    handleChange(event){
        this.props.onChange.bind(({
            nameValue: event.target.value,
        }));
    }

    render(){
        return (
        <input type="text" 
            className="name-user" 
            placeholder="Name" 
            onChange={this.handleChange.bind(this)}>
        </input>);
    }
}