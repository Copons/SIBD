import React from 'react';
import { map } from 'lodash-es';
import classNames from 'classnames';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import TableRow from 'react-md/lib/DataTables/TableRow';

const headerItems = [
	{ label: 'Rating', value: 'rating' },
	{ label: 'Title', value: 'title' },
	{ label: 'Type', value: 'type' },
	{ label: 'Authors', value: '' },
	{ label: 'Start', value: 'start' },
	{ label: 'End', value: 'end' },
	{ label: 'Edit', value: '' },
];

export const MainTableHeader = ({ changeSort, sortAscending, sortField }) => (
	<TableHeader>
		<TableRow>
			{map(headerItems, ({ label, value }) => (
				<TableColumn
					className={classNames({ 'sort-field': value === sortField })}
					key={value}
					onClick={value ? changeSort(value) : undefined}
					role="button"
					sorted={value === sortField ? sortAscending : undefined}
				>
					{label}
				</TableColumn>
			))}
		</TableRow>
	</TableHeader>
);

export default MainTableHeader;
