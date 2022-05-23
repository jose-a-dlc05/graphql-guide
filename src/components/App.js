import React from 'react';
import logo from '../logo.svg';
import StarCount from './StarCount';

export default () => (
	<div className='App'>
		<header className='App-header'>
			<StarCount />
			<img src={logo} className='App-logo' alt='logo' />
			<h1 className='App-title'>The GraphQL Guide</h1>
		</header>
		<p className='App-intro'>
			To get started, edit <code>src/App.js</code>, and save to reload.
		</p>
	</div>
);
