import { each } from 'lodash-es';

import { sibdGet, sibdPost } from 'api';
import { AUTHOR_REMOVE, AUTHOR_SET, AUTHORS_RESET } from 'state/action-types';

export const removeAuthor = authorId => ({
	type: AUTHOR_REMOVE,
	authorId,
});

export const resetAuthors = () => ({
	type: AUTHORS_RESET,
});

export const setAuthor = author => ({
	type: AUTHOR_SET,
	author,
});

export const fetchAllAuthors = () => dispatch => {
	dispatch(resetAuthors());
	return sibdGet('get/authors').then(authors =>
		each(authors, author => dispatch(setAuthor(author)))
	);
};

export const insertAuthor = author => dispatch =>
	sibdPost('insert/authors', author).then(({ id }) =>
		dispatch(setAuthor({ ...author, id }))
	);

export const updateAuthor = author => dispatch =>
	sibdPost('update/authors', author).then(() => dispatch(setAuthor(author)));

export const deleteAuthor = authorId => dispatch =>
	sibdGet('delete/authors', { id: authorId }).then(() =>
		dispatch(removeAuthor(authorId))
	);
