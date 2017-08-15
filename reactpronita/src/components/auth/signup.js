import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {connect} from 'react-redux';
import {signupUser} from '../../actions/userActions';

class Signup extends Component {

    renderInput(field){
        const {meta:{touched, error}} = field;
        const classN= `${ touched && error ? 'inputError':'' }`;
        return(
            <span>
                <input className={classN}  type={field.type} name={field.name} placeholder={field.placeholder} {...field.input} />
                <span className='textError'>{touched ? error : ''}</span>
            </span>
        )
    }
    onSubmit(values){
        //call action creators to signup the user...
        this.props.signupUser(values);

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
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
            <div className="field half first">
                <Field component={this.renderInput} type="text" name="firstName" id="firstName" placeholder="firstName" />
            </div>
            <div className="field half first">
                <Field component={this.renderInput} type="text" name="lastName" id="lastName" placeholder="Last Name / Surname" />
            </div>
            <div className="field half">
                <Field component={this.renderInput} type="email" name="email" id="email" placeholder="Email" />
            </div>

            <div className="field half">
                <Field component={this.renderInput} type="text" name="userName" id="userName" placeholder="User Name" />
            </div>
            <div className="field half">
                <Field component={this.renderInput} type="text" name="phoneNumber" id="phoneNumber" placeholder="PhoneNumber" />
            </div>
            <div className="field half">
                <Field component={this.renderInput} type="text" name="phoneNumber" id="city" placeholder="city" />
            </div>
            <div className="field half">
                <Field component={this.renderInput} type="password" name="password" id="password" placeholder="Password" />
            </div>
            <div className="field half">
                <Field component={this.renderInput} type="password" name="conPassword" id="conPassword" placeholder="confirm Password" />
            </div>
            {this.renderAlert()}
            <button action="submit" className="btn btn-primary">Sign up!</button>
      </form>
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
