import React from 'react';

const user = (props) => (
  <div>
      <h1>{props.name}</h1>
      <p>Age: {props.age}</p>
      <style jsx>{`
        h1 {
            color: red;
        }
        div {
            border: 2px solid green;
        }
      `}</style>
  </div>
);

export default user;