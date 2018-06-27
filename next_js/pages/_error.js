import React from 'react';
import Router from "next/router";

const errorPage = (props) => (
    <div>
        <h1>Oops Error</h1>
        <button onClick={() => Router.push('/')}>Go to back</button>
    </div>
);

export default errorPage;