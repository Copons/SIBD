import React from 'react';
import { hot } from 'react-hot-loader';
import Layout from './components/layout';
import 'react-md/dist/react-md.indigo-pink.min.css';

export const Sibd = () => (
	<div>
		<Layout />
	</div>
);

export default hot(module)(Sibd);
