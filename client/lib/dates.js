import { isString } from 'lodash-es';

export const dateFromMySQL = date => new Date(date);

export const dateToMySQL = date => {
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
