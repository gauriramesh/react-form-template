import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            phone: '',
            nameError: '',
            emailError: '',
            phoneError: ''
        }

        this.validateEmail = this.validateEmail.bind(this);
        this.validateName = this.validateName.bind(this);
        this.validatePhone = this.validatePhone.bind(this);
        this.updateState = this.updateState.bind(this);
    };



    validateEmail(input) {
        //language=JSRegexp
        //TODO: Fix this regex, doesn't actually take everything into account.
        var regexp = /^([a-zA-Z0-9]+)@(.+)(\.)(com|org|net|edu)/;
        return regexp.test(input);
    }

    validateName(input) {
        if(input.length >= 2) {
            return true;
        } return false;
    }

    validatePhone(input) {
        var regexp = /[0-9]{10}/;
        return regexp.test(input);
    }



    //TODO: Make sure class name and state name are the same.
    //updates the state by taking in an event, a validator function (i.e validateName, validatePhone), and an error name to update the state of.
    updateState(e, validatorFunction, errorName) {
            if (validatorFunction === true) {
                this.setState({[e.target.classList[0]]: e.target.value});
                this.setState({[errorName]: 'Valid'});
                document.getElementById(e.target.classList[0]).style.color = "green";
            }
            else if (e.target.value.length === 0) {
                this.setState({[errorName]: 'Empty submission'});
                document.getElementById(e.target.classList[0]).style.color = "red";
            }
            else {
                this.setState({[errorName]: 'Invalid form input'});
                document.getElementById(e.target.classList[0]).style.color = "red";
                //Test
            }
    }

    //create custom error method.

    //Maybe create a validator component that changes depending on the input?


  render() {
    // let phoneClass = '';
    // if (this.state.phoneError !== 'Valid') {
    //     phoneClass = 'successful-phone';
    // } else {
    //     phoneClass = 'failing-phone';
    // }
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Form</h2>
        </div>
          <form>
              Name:
              <input className="name" type="text" id="input-text-sm"
                     onChange={(event) => this.updateState(event, this.validateName(event.target.value), "nameError")}/>
              <p id="name">  {this.state.nameError} </p> <br/>
              Email:
              <input className="email" type="text"
                     onChange={(event) => this.updateState(event, this.validateEmail(event.target.value), "emailError")}/>
              <p id="email">  {this.state.emailError} </p> <br/>
              Phone:
              <input className="phone" /*{phoneClass}*/ type="text"
                     onChange={(event) => this.updateState(event, this.validatePhone(event.target.value), "phoneError")}/>
              <p id="phone">  {this.state.phoneError} </p> <br/>
              <input type="submit"/>
          </form>
      </div>
    );
  }
}

export default App;
