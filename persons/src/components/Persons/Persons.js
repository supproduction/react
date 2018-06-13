import React, { Component } from 'react';
import Person from './Person/Person';

class Persons extends Component {
  componentDidMount() {

  }

  render () {
    return this.props.persons.map((person, index) => {
      return  <Person
        click={() => this.props.clicked(index)}
        name={person.name}
        key={person.id}
        age={person.age}
        change={(e) => this.props.changed(e, person.id)} />
    });
  }
}

export default Persons;

