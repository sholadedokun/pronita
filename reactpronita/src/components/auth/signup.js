import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {signupUser} from '../../actions/userActions';
import {Grid, Row, Col} from 'react-bootstrap';
import {renderInput} from '../commonFilters';
import {BrowserRouter as Router} from 'react-router-dom'

class Signup extends Component {

    onSubmit(values){
        //call action creators to signup the user...
        this.props.signupUser(values)
        .then(data=> this.props.history.push('/userAccount'))
    }
    renderAlert() {
      if (this.props.errorMessage) {
        return (
          <div className="alert alert-danger">
            <strong>Oops!</strong> {this.props.errorMessage}
          </div>
        );
      }
    }

  render() {
    const {handleSubmit, errorMessage} = this.props;

    return (
        <Grid>
        <Col xs={12}>
            <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
                <div className="field half first">
                    <Field component={renderInput} type="text" name="firstName" id="firstName" placeholder="firstName" />
                </div>
                <div className="field half first">
                    <Field component={renderInput} type="text" name="lastName" id="lastName" placeholder="Last Name / Surname" />
                </div>
                <div className="field half">
                    <Field component={renderInput} type="email" name="email" id="email" placeholder="Email" />
                </div>

                <div className="field half">
                    <Field component={renderInput} type="text" name="userName" id="userName" placeholder="User Name" />
                </div>
                <div className="field half">
                    <Field component={renderInput} type="text" name="phoneNumber" id="phoneNumber" placeholder="PhoneNumber" />
                </div>
                <div className="field half">
                    <Field component={renderInput} type="text" name="city" id="city" placeholder="city" />
                </div>
                <div className="field half">
                    <Field component={renderInput} type="password" name="password" id="password" placeholder="Password" />
                </div>
                <div className="field half">
                    <Field component={renderInput} type="password" name="conPassword" id="conPassword" placeholder="confirm Password" />
                </div>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign up!</button>
            </form>
        </Col>
        </Grid>
    );
  }
}

function validate(formProps) {
    const errors = {};
    if (!formProps.firstName) {
        errors.firstName = 'Please enter your first Name';
    }
    if (!formProps.lastName) {
        errors.lastName = 'Please enter your last Name';
    }
    if (!formProps.userName) {
        errors.userName = 'Please enter your user Name';
    }
    if (!formProps.email) {
        errors.email = 'Please enter an email';
    }

    if (!formProps.password) {
        errors.password = 'Please enter a password';
    }
    if(formProps.password){
        formProps.password=formProps.password.trim()
        if(formProps.password.length < 5){
                errors.password="Password Length must be greater than 5 Characters"
        }
    }

    if (!formProps.conPassword) {
        errors.conPassword = 'Please enter a password confirmation';
    }

    if (formProps.password !== formProps.conPassword && formProps.conPassword) {
        errors.password = 'Passwords must match';
    }

    return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.user.error };
}
export default reduxForm({
    validate,
    form: 'signUp'
})(
    connect(mapStateToProps, {signupUser})(Signup)
)
;
