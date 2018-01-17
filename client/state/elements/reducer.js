import { omit } from 'lodash-es';

import {
	ELEMENT_REMOVE,
	ELEMENT_SET,
	ELEMENTS_RESET,
} from 'state/action-types';

export const elements = (state = {}, action) => {
	switch (action.type) {
		case ELEMENT_REMOVE:
			return omit(state, action.elementId);
		case ELEMENT_SET:
			return {
				...state,
				[action.element.id]: action.element,
			};
		case ELEMENTS_RESET:
			return {};
	}
	return state;
};

export default elements;
