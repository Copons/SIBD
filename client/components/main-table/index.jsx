import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEqual, map, sortBy } from 'lodash-es';
import classNames from 'classnames';
import {
	DataTable,
	EditDialogColumn,
	SelectFieldColumn,
	TableHeader,
	TableBody,
	TableRow,
	TableColumn,
} from 'react-md';

import { fetchAllElements, updateElement } from 'state/elements/actions';
import { getElements } from 'state/elements/selectors';
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
		const sortedElements = sortBy(elements, ['start', sortField]);
		return sortAscending ? sortedElements : sortedElements.reverse();
	};

	updateElement = (element, field) => value =>
		this.props.updateElement({ ...element, [field]: value });

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
			<div>
				<MainTableHeader />
				<DataTable plain>
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
								<TableColumn className="table-column-nowrap">
									{element.start}
								</TableColumn>
								<TableColumn className="table-column-nowrap">
									{element.end}
								</TableColumn>
								<TableColumn>
									<Rating rating={element.rating} />
								</TableColumn>
							</TableRow>
						))}
					</TableBody>
				</DataTable>
			</div>
		);
	}
}

const mapStateToProps = state => ({ elements: getElements(state) });

const mapDispatchToProps = { fetchAllElements, updateElement };

export default connect(mapStateToProps, mapDispatchToProps)(MainTable);
