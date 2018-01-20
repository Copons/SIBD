import { get } from 'lodash-es';

export const getAuthor = (state, authorId) => get(state, ['authors', authorId]);

export const getAuthors = state => get(state, 'authors', []);
