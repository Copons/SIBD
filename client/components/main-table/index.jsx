import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEqual, map, sortBy } from 'lodash-es';
import classNames from 'classnames';
import {
	DataTable,
	DatePicker,
	EditDialogColumn,
	SelectFieldColumn,
	TableHeader,
	TableBody,
	TableRow,
	TableColumn,
} from 'react-md';

import { dateFromMySQL, dateToMySQL } from 'lib/dates';
import { fetchAllElements, updateElement } from 'state/elements/actions';
import { getElements, getElementsByYear } from 'state/elements/selectors';
import { getViewFilter } from 'state/ui/selectors';
import Rating from 'components/rating';
import MainTableHeader from 'components/main-table/main-table-header';
import { TYPES } from 'components/main-table/constants';

import './style.scss';

export class MainTable extends Component {
	state = {
		sortAscending: false,
		sortField: 'end',
	};

	componentWillMount() {
		this.props.fetchAllElements();
	}

	shouldComponentUpdate(nextProps, nextState) {
		return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
	}

	changeSort = field => () => {
		this.setState(({ sortAscending, sortField }) => ({
			sortAscending: sortField === field ? !sortAscending : true,
			sortField: field,
		}));
	};

	sortElements = () => {
		const { elements } = this.props;
		const { sortAscending, sortField } = this.state;
		const sortedElements = sortBy(elements, [sortField, 'start']);
		return sortAscending ? sortedElements : sortedElements.reverse();
	};

	updateElement = (element, field) => value => {
		const parsedValue =
			'start' === field || 'end' === field ? dateToMySQL(value) : value;
		this.props.updateElement({ ...element, [field]: parsedValue });
	};

	renderHeader = () => {
		const { sortAscending, sortField } = this.state;
		const headerItems = [
			{ label: 'Title', name: 'title' },
			{ label: 'Type', name: 'type' },
			{ label: 'Start', name: 'start' },
			{ label: 'End', name: 'end' },
			{ label: 'Rating', name: 'rating' },
		];

		return map(headerItems, ({ label, name }) => (
			<TableColumn
				className={classNames({ 'sort-field': name === sortField })}
				key={name}
				onClick={this.changeSort(name)}
				role="button"
				sorted={sortAscending}
			>
				{label}
			</TableColumn>
		));
	};

	render() {
		const elements = this.sortElements();

		return (
			<div>
				<MainTableHeader />
				<DataTable className="main-table" plain>
					<TableHeader>
						<TableRow>{this.renderHeader()}</TableRow>
					</TableHeader>
					<TableBody>
						{map(elements, element => (
							<TableRow key={`element-${element.id}`}>
								<EditDialogColumn
									defaultValue={element.title}
									label="Title"
									okOnOutsideClick={false}
									onOkClick={this.updateElement(element, 'title')}
									visibleOnFocus={false}
								/>
								<SelectFieldColumn
									defaultValue={element.type}
									menuItems={TYPES}
									onChange={this.updateElement(element, 'type')}
								/>
								<TableColumn className="table-column-fixed-min-width">
									<DatePicker
										defaultValue={dateFromMySQL(element.start)}
										id={`element-${element.id}-start`}
										locales="en-GB"
										onChange={this.updateElement(element, 'start')}
									/>
								</TableColumn>
								<TableColumn className="table-column-fixed-min-width">
									<DatePicker
										defaultValue={dateFromMySQL(element.end)}
										id={`element-${element.id}-end`}
										locales="en-GB"
										onChange={this.updateElement(element, 'end')}
									/>
								</TableColumn>
								<TableColumn>
									<Rating
										rating={element.rating}
										onChange={this.updateElement(element, 'rating')}
									/>
								</TableColumn>
							</TableRow>
						))}
					</TableBody>
				</DataTable>
			</div>
		);
	}
}

const mapStateToProps = state => {
	const viewFilterYear = getViewFilter(state, 'year');
	const elements =
		'all' === viewFilterYear
			? getElements(state)
			: getElementsByYear(state, viewFilterYear);

	return { elements };
};

const mapDispatchToProps = { fetchAllElements, updateElement };

export default connect(mapStateToProps, mapDispatchToProps)(MainTable);
