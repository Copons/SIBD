import { get } from 'lodash-es';

export const getViewFilters = state => get(state, 'ui.viewFilters', {});

export const getViewFilter = (state, filter) => getViewFilters(state)[filter];

export const getYears = state => get(state, 'ui.years', []);
