import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {signinUser}  from '../../actions/userActions';
import {connect} from 'react-redux';

class Signin extends Component {
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
        this.props.signinUser(values)
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
    const { handleSubmit} = this.props;

    return (
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
            <div className="field half first">
                <Field component={this.renderInput} type="text" name="identity"  placeholder="user name or email" />
            </div>
            <div className="field half first">
                <Field component={this.renderInput} type="password" name="password"  placeholder="Type Password" />
            </div>
            {this.renderAlert()}
            <button action="submit" className="btn btn-primary">Sign in</button>
        </form>
    );
  }
}
function validate(formProps) {
    const errors = {};
    if (!formProps.identity) {
        errors.identity = 'Please enter an email or username';
    }

    if (!formProps.password) {
        errors.password = 'Please enter a password';
    }

    return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.user.error };
}

export default reduxForm({
    validate,
    form: 'signin'
})(
    connect(mapStateToProps, {signinUser})(Signin)
)
