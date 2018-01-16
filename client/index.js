import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from 'state';
import Sibd from 'Sibd';

render(
	<Provider store={store}>
		<Sibd />
	</Provider>,
	document.getElementById('app')
);
