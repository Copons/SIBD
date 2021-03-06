import { isString } from 'lodash-es';

export const dateFromMySQL = date =>
	'0000-00-00' === date ? null : new Date(date);

export const dateToMySQL = date => {
	if (!date) {
		return '0000-00-00';
	}
	if (isString(date)) {
		return date
			.split('/')
			.reverse()
			.join('-');
	}
	return date.toISOString().substr(0, 10);
};

export const newDate = () =>
	dateFromMySQL(new Date().toISOString().substr(0, 10));

export const getCurrentYear = () => new Date().getFullYear();

export const displayDate = date =>
	'0000-00-00' === date
		? ''
		: date
				.split('-')
				.reverse()
				.join('/');
