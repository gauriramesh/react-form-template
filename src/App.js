import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// eventually should resolve / delete comments
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
        // what does the line under this do?
        //language=JSRegexp
        //TODO: Fix this regex, doesn't actually take everything into account.
        var regexp = /^([a-zA-Z0-9]+)@(.+)(\.)(com|org|net|edu)/;
        return regexp.test(input);
    }

    validateName(input) {
        if(input.length >= 2) { // what if my name is just "A" D:
            return true;
        }

        return false;

        // not as readable but could just return the result of the condition:
        // ```
        // return input.length >=2;
        // ```
        //
        // even more unreadable but shorter through es6 arrow function
        // ```
        // validateName = (input) => input.length >=2;
        // ```
    }

    validatePhone(input) {
        var regexp = /[0-9]{10}/; // TODO fix this regex https://stackoverflow.com/questions/25286239/matching-exactly-10-digits-in-javascript
        return regexp.test(input);
        // something cool about vanilla js is regexp is its own object type.
        // more unreadable but could do
        // ```
        // return /[0-9]{10}/.test(input);
        // ```
        //
        // Or once again even more unreadable but shorter with arrow
        // ```
        // validatePhone = (input) => /[0-9]{10}/.test(input);
        // ```
    }



    //TODO: Make sure class name and state name are the same.
    //updates the state by taking in an event, a validator function (i.e validateName, validatePhone), and an error name to update the state of.

    // validatorFunction isn't technically a function, maybe could think of better name like `isValid` if you stick with it
    updateState(e, validatorFunction, errorName) {
            // I was curious which approach for changing style was preferred, stumbled across this article
            // https://discuss.reactjs.org/t/best-practice-for-modifying-css-of-react-components-parent/3439/2
            // the person asking the question does something almost identical to you
            // it looks like doing a change of classname(s) is preferrable

            // `=== true` could be removed if you think it's readable as `if (validatorFunction) { . . . }`
            if (validatorFunction === true) {
                // could put into one setstate call
                // this.setState({ [e.target.classList[0]]: e.target.value, [errorName]: 'Valid' });
                this.setState({[e.target.classList[0]]: e.target.value});
                this.setState({[errorName]: 'Valid'}); // errorName might not be best name since its value can be 'Valid'

                document.getElementById(e.target.classList[0]).style.color = "green";
            }

            // I think empty submission / invalid should be different colors.
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

    // could do all validation and style manipulation in render, depends what you prefer
    // you could try to style #name, #id, and #phone instead of <br />'s
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
              <p id="name">  {this.state.nameError} </p><br/>
              Email:
              <input className="email" type="text"
                     onChange={(event) => this.updateState(event, this.validateEmail(event.target.value), "emailError")}/>
              <p id="email">{this.state.emailError}</p> <br/>
              Phone:
              <input className="phone" /*{phoneClass}*/ type="text"
                     onChange={(event) => this.updateState(event, this.validatePhone(event.target.value), "phoneError")}/>
              <p id="phone">{this.state.phoneError}</p> <br/>
              <input type="submit"/>
          </form>
      </div>
    );
  }
}

export default App;
