import React from 'react';
import { render } from 'react-dom';
import './index.css';
import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	HttpLink,
} from '@apollo/client';
import App from './components/App';

const link = new HttpLink({
	uri: 'https://api.graphql.guide/graphql',
});

const cache = new InMemoryCache();

const client = new ApolloClient({
	link,
	cache,
});

render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root')
);

module.hot.accept();
