import React, { Component } from 'react';
import './App.css';
import Persons  from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

export const AuthContext = React.createContext(false);

class App extends Component {
  state = {
    persons: [
      {id: '21414', name: 'Alex', age: 14},
      {id: '214143', name: 'Alex1', age: 15},
      {id: '214141', name: 'Alex2', age: 16},
    ],
    showPersons: false,
    toggleClicked: 0,
    authenticated: false
  };

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons});
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;

    this.setState( ( prevState, props ) => {
      return {
        showPersons: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      }
    })
  };

  nameChangedHandler = (e, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const persons = [...this.state.persons];
    persons[personIndex].name = e.target.value;

    this.setState({persons});
  };

  loginHandler = () => {
    this.setState({authenticated: true})
  };

  render() {
    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons persons={this.state.persons}
                   clicked={this.deletePersonHandler}
                   changed={this.nameChangedHandler} />;
    }


    return (
      <div className="App">
        <Cockpit showPersons={this.state.showPersons}
                 appTitle={this.props.title}
                 login={this.loginHandler}
                 clicked={this.togglePersonsHandler} />
        <AuthContext.Provider value={this.state.authenticated}>{persons}</AuthContext.Provider>
      </div>
    );
  }
}

export default App;
