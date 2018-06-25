import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import classes from './Auth.css';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import { checkValidity } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        isSignUp: true
    }

    inputChangedHandler = (e, inputId) => {
        const isValidity = this.state.controls[inputId].validation;
        const updatedOrderForm = {
            ...this.state.controls,
            [inputId]: {
                ...this.state.controls[inputId],
                value: e.target.value,
                touched: true
            }
        };

        if (isValidity) {
            updatedOrderForm[inputId].valid = checkValidity(e.target.value, this.state.controls[inputId].validation);
        }

        let formIsValid = true;

        for (let inpKeys in updatedOrderForm) {
            if (updatedOrderForm[inpKeys].valid !== undefined) {
                formIsValid = updatedOrderForm[inpKeys].valid && formIsValid;
            }
        }

        this.setState({controls: updatedOrderForm, formIsValid: formIsValid});
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
    }

    componentDidMount() {
        if (!this.props.builtBurger && this.props.redirectPath !== '/') {
            this.props.onSetAuthRedirectPath('/')
        }
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                value={formElement.config.value} />
        ));

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        let authRedirect = null;

        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.redirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignUp ? "SIGNUP" : "SIGNIN"}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        redirectPath: state.auth.authRedirect,
        builtBurger: state.burgerBuilderReducer.built
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, pass, idSignup) => dispatch(actions.auth(email, pass, idSignup)),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirect(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);