import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEqual, map, sortBy } from 'lodash-es';
import classNames from 'classnames';
import {
	DataTable,
	TableHeader,
	TableBody,
	TableRow,
	TableColumn,
} from 'react-md';

import { fetchElementsFromTheApi } from 'state/elements/actions';
import { getElements } from 'state/elements/selectors';
import Rating from 'components/rating';

import './style.scss';

export class MainTable extends Component {
	state = {
		sortAscending: false,
		sortField: 'end',
	};

	componentWillMount() {
		this.props.fetchElementsFromTheApi();
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
		const sortedElements = sortBy(elements, ['start', sortField]);
		return sortAscending ? sortedElements : sortedElements.reverse();
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
				grow
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
			<DataTable plain>
				<TableHeader>
					<TableRow>{this.renderHeader()}</TableRow>
				</TableHeader>
				<TableBody>
					{map(elements, element => (
						<TableRow key={element.id}>
							<TableColumn>{element.title}</TableColumn>
							<TableColumn>{element.type}</TableColumn>
							<TableColumn>{element.start}</TableColumn>
							<TableColumn>{element.end}</TableColumn>
							<TableColumn>
								<Rating rating={element.rating} />
							</TableColumn>
						</TableRow>
					))}
				</TableBody>
			</DataTable>
		);
	}
}

const mapStateToProps = state => ({ elements: getElements(state) });

const mapDispatchToProps = { fetchElementsFromTheApi };

export default connect(mapStateToProps, mapDispatchToProps)(MainTable);
