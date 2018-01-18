import { filter, get, startsWith } from 'lodash-es';

import { getCurrentYear } from 'lib/dates';

export const getElement = (state, elementId) =>
	get(state, ['elements', elementId]);

export const getElements = state => get(state, 'elements', []);

export const getElementsByYear = (state, year) =>
	filter(getElements(state), element => {
		return (
			startsWith(element.end, year) ||
			(year === getCurrentYear() && '0000-00-00' === element.end)
		);
	});
