import { each } from 'lodash-es';

import { sibdGet, sibdUpdate } from 'api';
import { ELEMENT_REMOVE, ELEMENT_SET } from 'state/action-types';

export const removeElement = elementId => ({
	type: ELEMENT_REMOVE,
	elementId,
});

export const setElement = element => ({
	type: ELEMENT_SET,
	element,
});

export const fetchAllElements = () => dispatch =>
	sibdGet('get/elements').then(elements =>
		each(elements, element => dispatch(setElement(element)))
	);

export const updateElement = element => dispatch =>
	sibdUpdate('update/elements', element).then(() =>
		dispatch(setElement(element))
	);
