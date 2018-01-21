import { each, map } from 'lodash-es';

import { sibdGet, sibdPost } from 'api';
import {
	ELEMENT_REMOVE,
	ELEMENT_SET,
	ELEMENTS_RESET,
} from 'state/action-types';

export const removeElement = elementId => ({
	type: ELEMENT_REMOVE,
	elementId,
});

export const resetElements = () => ({
	type: ELEMENTS_RESET,
});

export const setElement = element => ({
	type: ELEMENT_SET,
	element,
});

export const fetchAllElements = () => dispatch => {
	dispatch(resetElements());
	return sibdGet('get/elements').then(elements =>
		each(elements, element => dispatch(setElement(element)))
	);
};

export const insertElement = element => dispatch =>
	sibdPost('insert/elements', {
		...element,
		authors: map(element.authors, 'id'),
	}).then(({ id }) => dispatch(setElement({ ...element, id })));

export const updateElement = element => dispatch =>
	sibdPost('update/elements', {
		...element,
		authors: map(element.authors, 'id'),
	}).then(() => dispatch(setElement(element)));

export const deleteElement = elementId => dispatch =>
	sibdGet('delete/elements', { id: elementId }).then(() =>
		dispatch(removeElement(elementId))
	);
