import { combineReducers } from 'redux';
import { map } from 'lodash';

import { VIEW_FILTERS_SET, YEARS_SET } from 'state/action-types';

const viewFilters = (state = {}, { filters, type }) =>
	VIEW_FILTERS_SET === type ? { ...state, ...filters } : state;

const years = (state = [], action) =>
	YEARS_SET === action.type
		? map(action.years, year => parseInt(year, 10))
		: state;

export default combineReducers({ viewFilters, years });
