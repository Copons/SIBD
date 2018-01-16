import { ELEMENT_REMOVE, ELEMENT_SET } from 'state/action-types';

export const removeElement = elementId => ({
	type: ELEMENT_REMOVE,
	elementId,
});

export const setElement = element => ({
	type: ELEMENT_SET,
	element,
});
