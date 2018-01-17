import { sibdGet } from 'api';
import { VIEW_FILTERS_SET, YEARS_SET } from 'state/action-types';

export const setViewFilters = filters => ({
	type: VIEW_FILTERS_SET,
	filters,
});

export const setYears = years => ({
	type: YEARS_SET,
	years,
});

export const fetchAllYears = () => dispatch =>
	sibdGet('get/years').then(years => dispatch(setYears(years)));
