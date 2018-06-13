import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {AuthContext} from '../../../containers/App';

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
  }
  componentDidMount() {
    this.inputElement.current.focus();
  }

  focus() {
    this.inputElement.current.focus();
  }

  render() {
    return (
      <React.Fragment>
        <AuthContext.Consumer>
          {auth => auth ? <p>Hello!</p> : null}
        </AuthContext.Consumer>
        <p onClick={this.props.click}>Person {this.props.name} age {this.props.age}</p>
        <p>{this.props.children}</p>
        <input type="text"
               ref={this.inputElement}
               onChange={this.props.change}
               value={this.props.name} />
      </React.Fragment>
    )
  }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};

export default Person;