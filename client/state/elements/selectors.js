import { filter, get } from 'lodash-es';

export const getElement = (state, elementId) =>
	get(state, ['elements', elementId]);

export const getElements = state => get(state, 'elements', []);

export const getElementsByYear = (state, year) =>
	filter(getElements(state), element => element.year === year);
