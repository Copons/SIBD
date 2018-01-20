import React from 'react';
import { find } from 'lodash';
import Avatar from 'react-md/lib/Avatars/Avatar';
import Chip from 'react-md/lib/Chips/Chip';
import FontIcon from 'react-md/lib/FontIcons/FontIcon';

import { TYPES } from 'lib/types';

export const TypeChip = ({ type }) => {
	if (!type) {
		return null;
	}
	const { color, icon, label } = find(TYPES, { value: type });
	return (
		<Chip
			avatar={<Avatar icon={<FontIcon>{icon}</FontIcon>} suffix={color} />}
			label={label}
		/>
	);
};

export default TypeChip;
