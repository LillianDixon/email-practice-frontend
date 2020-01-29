import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
  constructor(props){
    super(props)

    this.state={
      name: "",
      email: "",
      // to: '',
      subject: "",
      message: ""
    } 

    this.handleChange=this.handleChange.bind(this);

  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

handleSubmit(e){
  console.log(this.state)
  e.preventDefault()
  fetch('http://127.0.0.1:5000/email', {
    method: 'POST',
    headers: {
        'Content-Type': "application/json"
    },
    body: JSON.stringify({name: this.state.name, email: this.state.email, subject: this.state.subject, message: this.state.message})
})
 .then(response => {return response.json();})
 .then(responseData => {console.log(responseData)})
 .catch(error => {
     console.log('handlesubmit error' + error)
 })
 this.clearContactForm()
}

clearContactForm(){
    this.setState({
        
        name: "",
        email: "",
        // to: '',
        subject: "",
        message: "",
    })
}

  render() {
    return (
      <div className='app'>
      <h1>Email Me!</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-elements">
            <input
              type='text'
              name="name"
              placeholder="Name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>
          <div className="form-elements">
            <input
              type='email'
              name="email"
              placeholder="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          {/* <div className="form-elements">
            <input
              type='email'
              name="to"
              placeholder="to"
              onChange={this.handleChange}
              value={this.state.to}
            /> */}
          {/* </div> */}
          <div className="form-elements">
            <input
              type='text'
              name="subject"
              placeholder="Subject"
              onChange={this.handleChange}
              value={this.state.subject}
            />
          </div>
          <div className="form-elements">
            <textarea
              type='text'
              name="message"
              placeholder="Message"
              onChange={this.handleChange}
              value={this.state.message}
            />
          </div>
        </form>
        <button className="btn" type="send" onClick={e => this.handleSubmit(e)} value="Submit">Send</button>
      </div>
    );
  }
}
