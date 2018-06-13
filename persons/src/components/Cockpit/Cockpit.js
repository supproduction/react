import React from 'react';
import Aux from '../../hoc/Aux';

const cockpit = ( props ) => {
  const style = {
    backgroundColor: 'green'
  };

  if (props.showPersons) {
    style.backgroundColor = 'red';
  }

  return (
    <Aux>
      <h1>{props.appTitle}</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, fugit neque. Ab animi corporis distinctio doloribus eaque eligendi, eum molestiae optio perspiciatis quae quos sint sunt suscipit tempore voluptas voluptates?</p>
      <button
        onClick={props.clicked}
        style={style}>Switch Name</button>
      <button onClick={props.login}>Log in</button>
    </Aux>
  );
};

export default cockpit;