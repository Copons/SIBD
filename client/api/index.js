import queryString from 'querystring';
import { each } from 'lodash-es';

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

export const sibdUpdate = (endpoint, body = {}) => {
	const formData = new FormData();
	each(body, (value, name) => formData.append(name, value));
	return fetch(apiPath(endpoint), { method: 'POST', body: formData })
		.then(res => res.json())
		.then(res => res.body)
		.catch(e => log(e));
};
