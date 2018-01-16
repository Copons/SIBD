import React from 'react';
import { FontIcon } from 'react-md';

import './style.scss';

export const Rating = ({ rating }) => {
	const fiveStarRating = rating / 2;
	const fullStars = Math.floor(fiveStarRating);
	const halfStar = 0 !== fiveStarRating % 1 ? 1 : 0;

	return (
		<div className="rating">
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
