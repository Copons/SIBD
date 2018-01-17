import { map, range } from 'lodash-es';

export const getRatingItems = () =>
	map(range(11), i => ({ label: i, value: i }));
