import React from 'react';
import { FontIcon } from 'react-md';
import classNames from 'classnames';

import './style.scss';

export const Rating = props => {
	const rating = props.rating || 0;
	const fiveStarRating = rating / 2;
	const fullStars = Math.floor(fiveStarRating);
	const halfStar = 0 !== fiveStarRating % 1 ? 1 : 0;

	const classes = classNames('rating', props.className);

	return (
		<div className={classes} {...props}>
			{[...new Array(fullStars)].map((star, index) => (
				<FontIcon key={`full-${index}`}>star</FontIcon>
			))}

			{!!halfStar && <FontIcon>star_half</FontIcon>}

			{[...new Array(5 - fullStars - halfStar)].map((star, index) => (
				<FontIcon key={`full-${index}`}>star_border</FontIcon>
			))}
		</div>
	);
};

export default Rating;
