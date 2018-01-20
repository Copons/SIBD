import { omit } from 'lodash-es';

import { AUTHOR_REMOVE, AUTHOR_SET, AUTHORS_RESET } from 'state/action-types';

export const authors = (state = {}, action) => {
	switch (action.type) {
		case AUTHOR_REMOVE:
			return omit(state, action.authorId);
		case AUTHOR_SET:
			return {
				...state,
				[action.author.id]: action.author,
			};
		case AUTHORS_RESET:
			return {};
	}
	return state;
};

export default authors;
