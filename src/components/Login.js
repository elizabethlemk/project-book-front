import React from 'react'
import { Form } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { getAuth } from '../actions/userAction'
import { withRouter } from 'react-router-dom'


class Login extends React.Component {

  state = {
    username: '',
    password: ''
  };

  handleChange = (event, {name, value}) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }
   handleSubmit = event => {
    event.preventDefault()
    if (this.props.getAuth(this.state)) {
      this.props.history.push("/home")
    } else {
      window.alert("Invalid login credentials")
    }
  }

  render(){
    const {username, password} = this.state
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Input label='Username'
          placeholder='username'
          name='username'
          value={username}
          onChange={this.handleChange} />

        <Form.Input label='Password'
          type='password'
          placeholder='password'
          name='password'
          value={password}
          onChange={this.handleChange}/>
        <Form.Button>Submit</Form.Button>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.userReducer.user, error: null}
}

export default connect(mapStateToProps, {getAuth})(withRouter(Login))
