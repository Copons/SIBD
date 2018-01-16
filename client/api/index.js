import queryString from 'querystring';

const { log } = console;

const apiPath = path => API + path;

export const sibdGet = (endpoint, query = {}) => {
	const qs = queryString.stringify(query);
	const path = apiPath(endpoint) + (qs ? '?' : '') + qs;
	return fetch(path, { method: 'GET' })
		.then(res => res.json())
		.then(res => res.body)
		.catch(e => log(e));
};
