import React from 'react';
import Router from "next/router";
import User from '../../components/User';

const authIndexPage = (props) => (
    <div>
        <h1>The Auth Page - {props.appName}</h1>
        <button onClick={() => Router.push('/')}>Go to back</button>
        <User name="max" age="28" />
    </div>
);

authIndexPage.getInitialProps = (context) => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({appName: 'Super App (Auth)'})
        }, 1000)
    });
    return promise;
};

export default authIndexPage;